import { Injectable } from '@nestjs/common';
import { Group, Role, RoleName, State, User } from '@prisma/client';
import { DisciplineService } from '../discipline/DisciplineService';
import { GroupRepository } from './GroupRepository';
import { StudentRepository } from '../user/StudentRepository';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { UserRepository } from '../user/UserRepository';
import { EmailDTO } from './dto/EmailDTO';
import { ApproveDTO } from '../user/dto/ApproveDTO';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';
import { RoleDTO } from './dto/RoleDTO';
import { UpdateGroupDTO } from './dto/UpdateGroupDTO';
import { UserService } from '../user/UserService';
import { RoleRepository } from '../user/role/RoleRepository';
import { AVATARS } from '../auth/AuthService';
import { AlreadyRegisteredException } from '../../utils/exceptions/AlreadyRegisteredException';

const ROLE_LIST = [
  {
    name: RoleName.CAPTAIN,
    weight: 100,
    grants: {
      'groups.$groupId.*': true,
    },
  },
  {
    name: RoleName.MODERATOR,
    weight: 75,
    grants: {
      'groups.$groupId.admin.switch': false,
      'groups.$groupId.*': true,
    },
  },
  {
    name: RoleName.STUDENT,
    weight: 50,
    grants: {
      'groups.$groupId.admin.switch': false,
      'groups.$groupId.students.get': true,
      'groups.$groupId.students.*': false,
      'groups.$groupId.*': true,
    },
  },
];

@Injectable()
export class GroupService {
  constructor (
    private disciplineService: DisciplineService,
    private groupRepository: GroupRepository,
    private userService: UserService,
    private studentRepository: StudentRepository,
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
  ) {}

  async create (code: string): Promise<Group>  {
    const group = await this.groupRepository.create(code);
    await this.addPermissions(group.id);
    return group;
  }

  async getAll (body: QueryAllDTO) {
    return this.groupRepository.getAll(body);
  }

  async get (id: string) {
    return this.groupRepository.getGroup(id);
  }

  async getDisciplineTeachers (groupId: string) {
    const disciplines = await this.groupRepository.getDisciplines(groupId);
    return this.disciplineService.getDisciplinesWithTeachers(disciplines);
  }

  async getDisciplines (groupId: string) {
    const disciplines = await this.groupRepository.getDisciplines(groupId);

    return disciplines.map((d) => ({
      id: d.id,
      subject: d.subject,
      year: d.year,
      semester: d.semester,
      isSelective: d.isSelective,
    }));
  }

  async addUnregistered (groupId: string, body: EmailDTO) {
    const users = [];
    for (const email of body.emails) {
      const user = await this.userRepository.find({ email });
      if (user) throw new AlreadyRegisteredException();
    }
    for (const email of body.emails) {
      const user = await this.userRepository.create({
        email,
        avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
      });
      await this.studentRepository.create({
        userId: user.id,
        groupId: groupId,
        state: State.APPROVED,
      });
      await this.addGroupRole(groupId, user.id, RoleName.STUDENT);
      users.push({
        id: user.id,
        email: user.email,
      });
    }
    return { users };
  }

  async verifyStudent (groupId: string, userId: string, data: ApproveDTO) {
    const user = await this.userRepository.findById(userId);
    if (user.student.groupId !== groupId) {
      throw new NoPermissionException();
    }

    const verifiedStudent = await this.studentRepository.update(user.id, { state: data.state });

    if (data.state === State.APPROVED) {
      await this.addGroupRole(groupId, userId, RoleName.STUDENT);
    }

    return this.userService.getStudent(verifiedStudent);
  }

  async addGroupRole (groupId: string, userId: string, name: RoleName) {
    const groupRoles = await this.groupRepository.getRoles(groupId);
    const role = groupRoles.find((r) => r.name === name);
    await this.studentRepository.addRole(userId, role.id);
  }

  async moderatorSwitch (groupId: string, userId: string, { roleName }: RoleDTO) {
    const user = await this.userRepository.findById(userId);

    if (user.student.groupId !== groupId) {
      throw new NoPermissionException();
    }

    const roles = await this.groupRepository.getRoles(groupId);
    const role = roles.find((r) => r.name === roleName);
    const userRole = await this.userService.getGroupRoleDB(userId);

    await this.studentRepository.removeRole(userId, userRole.id);
    await this.studentRepository.addRole(userId, role.id);
  }

  async removeStudent (groupId: string, userId: string, reqUser: User) {
    const userRole = await this.userService.getGroupRoleDB(userId);
    const reqUserRole = await this.userService.getGroupRoleDB(reqUser.id);

    if (reqUserRole.weight <= userRole.weight) {
      throw new NoPermissionException();
    }
    if (userRole.groupId !== groupId) {
      throw new NoPermissionException();
    }

    await this.studentRepository.removeRole(userId, userRole.id);
    const user = await this.userRepository.findById(userId);
    if (!user.username) {
      await this.userRepository.deleteById(userId);
    }
    await this.studentRepository.update(userId, { state: State.DECLINED });
  }

  async getCaptain (groupId: string) {
    const students = await this.groupRepository.getStudents(groupId);

    const student = students.find(({ roles }) => {
      return roles.some((r) => this.checkRole(RoleName.CAPTAIN, r));
    });

    return student?.user;
  }

  checkRole (name: RoleName, role: { role: Role }) {
    return role.role.name === name;
  }

  async deleteGroup (groupId: string) {
    await this.groupRepository.deleteRoles(groupId);
    await this.groupRepository.delete(groupId);
  }

  async getStudents (groupId: string) {
    const students = await this.groupRepository.getStudents(groupId);
    return students
      .filter((st) => st.state === State.APPROVED)
      .map((s) => this.userService.getStudent(s));
  }

  async updateGroup (groupId: string, body: UpdateGroupDTO) {
    return this.groupRepository.updateGroup(groupId, body);
  }

  async getUnverifiedStudents (groupId: string) {
    const students = await this.groupRepository.getStudents(groupId);
    return students
      .filter((s) => s.state === State.PENDING)
      .map((s) => this.userService.getStudent(s, false));
  }

  async addPermissions (groupId: string) {
    for (const { grants, ...roles } of ROLE_LIST) {

      const grantList = Object.entries(grants).map(([permission, set]) => ({
        permission: permission.replace('$groupId', groupId),
        set,
      }));

      const role = await this.roleRepository.create({
        ...roles, 
        grants: {
          create: grantList,
        },
      });
      await this.groupRepository.addRole(role.id, groupId);
    }
  }

  async getOrCreate (code) {
    const group = await this.groupRepository.find(code);
    if (!group) {
      return this.create(code);
    }
    return group;
  }
}