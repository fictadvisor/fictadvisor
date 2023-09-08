import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { RoleName, State, User } from '@prisma/client';
import { DisciplineMapper } from '../../mappers/DisciplineMapper';
import { GroupRepository } from '../../database/repositories/GroupRepository';
import { StudentRepository } from '../../database/repositories/StudentRepository';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { UserRepository } from '../../database/repositories/UserRepository';
import { EmailDTO } from '../dtos/EmailDTO';
import { ApproveDTO } from '../dtos/ApproveDTO';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';
import { RoleDTO } from '../dtos/RoleDTO';
import { UpdateGroupDTO } from '../dtos/UpdateGroupDTO';
import { UserService } from './UserService';
import { RoleRepository } from '../../database/repositories/RoleRepository';
import { AVATARS } from './AuthService';
import { AlreadyRegisteredException } from '../../utils/exceptions/AlreadyRegisteredException';
import { DatabaseUtils } from '../../database/DatabaseUtils';
import { StudentMapper } from '../../mappers/StudentMapper';
import { DbGroup } from '../../database/entities/DbGroup';
import { QuerySemesterDTO } from '../dtos/QuerySemesterDTO';
import { DateService } from '../../utils/date/DateService';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';

const ROLE_LIST = [
  {
    name: RoleName.CAPTAIN,
    weight: 100,
    grants: {
      'groups.$groupId.*': { set: true, weight: 1 },
    },
  },
  {
    name: RoleName.MODERATOR,
    weight: 75,
    grants: {
      'groups.$groupId.admin.switch': { set: false, weight: 2 },
      'groups.$groupId.*': { set: true, weight: 1 },
    },
  },
  {
    name: RoleName.STUDENT,
    weight: 50,
    grants: {
      'groups.$groupId.admin.switch': { set: false, weight: 2 },
      'groups.$groupId.students.get': { set: true, weight: 4 },
      'groups.$groupId.students.*': { set: false, weight: 3 },
      'groups.$groupId.*': { set: true, weight: 1 },
    },
  },
];

@Injectable()
export class GroupService {
  constructor (
    private disciplineMapper: DisciplineMapper,
    private groupRepository: GroupRepository,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private studentRepository: StudentRepository,
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private disciplineRepository: DisciplineRepository,
    private studentMapper: StudentMapper,
    private dateService: DateService,
  ) {}

  async create (code: string): Promise<DbGroup>  {
    const group = await this.groupRepository.create({ code });
    await this.addPermissions(group.id);
    return group;
  }

  async getAll (body: QueryAllDTO) {
    const search = DatabaseUtils.getSearch(body, 'code');
    const sort = DatabaseUtils.getSort(body, 'code');

    const data = {
      where: {
        ...search,
      },
      ...sort,
    };
    return DatabaseUtils.paginate(this.groupRepository, body, data);
  }

  async get (id: string) {
    return this.groupRepository.findById(id);
  }

  async getDisciplineTeachers (groupId: string, { year, semester }: QuerySemesterDTO) {
    this.dateService.checkYearAndSemester(year, semester);
    const disciplines = await this.disciplineRepository.findMany({
      where: {
        groupId,
        semester,
        year,
      },
    });
    return this.disciplineMapper.getDisciplinesWithTeachers(disciplines);
  }

  async getDisciplines (groupId: string, { year, semester }: QuerySemesterDTO) {
    this.dateService.checkYearAndSemester(year, semester);
    const disciplines = await this.disciplineRepository.findMany({ 
      where: {
        groupId,
        semester,
        year,
      },
    });
    return this.disciplineMapper.getDisciplines(disciplines);
  }

  async getSelectiveDisciplines (groupId: string) {
    return this.disciplineRepository.findMany({
      where: {
        groupId,
        isSelective: true,
      },
    });
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

    const verifiedStudent = await this.studentRepository.updateById(user.id, { state: data.state });

    if (data.state === State.APPROVED) {
      await this.addGroupRole(groupId, userId, RoleName.STUDENT);
      await this.userService.putSelective(userId);
    }

    return verifiedStudent;
  }

  async addGroupRole (groupId: string, userId: string, name: RoleName) {
    const role = await this.roleRepository.find({
      groupRole: {
        groupId,
        role: {
          name,
        },
      },
    });
    await this.userService.giveRole(userId, role.id);
  }

  async moderatorSwitch (groupId: string, userId: string, { roleName }: RoleDTO) {
    const user = await this.userRepository.findById(userId);

    if (user.student.groupId !== groupId) {
      throw new NoPermissionException();
    }

    const groupRole = await this.roleRepository.find({
      groupRole: {
        groupId,
      },
      name: roleName,
    });
    const userRole = await this.userService.getGroupRoleDB(userId);

    await this.studentRepository.updateById(userId, {
      roles: {
        update: {
          where: {
            studentId_roleId: {
              roleId: userRole.id,
              studentId: userId,
            },
          },
          data: {
            roleId: groupRole.id,
          },
        },
      },
    });
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

    await this.userService.removeRole(
      userId,
      userRole.id,
    );

    const user = await this.userRepository.findById(userId);
    if (!user.username) {
      await this.userRepository.deleteById(userId);
    }
    await this.studentRepository.updateById(userId, { state: State.DECLINED });
  }

  async getCaptain (groupId: string) {
    const captain = await this.studentRepository.find({
      groupId,
      roles: {
        some: {
          role: {
            name: RoleName.CAPTAIN,
          },
        },
      },
    });

    return captain?.user;
  }

  async deleteGroup (groupId: string) {
    await this.roleRepository.deleteMany({ groupRole: { groupId } });
    await this.groupRepository.deleteById(groupId);
  }

  async getStudents (groupId: string) {
    const students = await this.studentRepository.findMany({ where: { groupId, state: State.APPROVED } });
    return students.map((s) => this.studentMapper.getStudent(s));
  }

  async updateGroup (groupId: string, body: UpdateGroupDTO) {
    return this.groupRepository.updateById(groupId, body);
  }

  async getUnverifiedStudents (groupId: string) {
    const students = await this.studentRepository.findMany({ where: { groupId, state: State.PENDING } });
    return students.map((s) => this.studentMapper.getStudent(s, false));
  }

  async addPermissions (groupId: string) {
    for (const { grants, ...roles } of ROLE_LIST) {

      const grantList = Object.entries(grants).map(([permission, description]) => ({
        permission: permission.replace('$groupId', groupId),
        ...description,
      }));

      await this.roleRepository.create({
        ...roles,
        grants: {
          create: grantList,
        },
        groupRole: {
          create: {
            groupId,
          },
        },
      });
    }
  }

  async switchCaptain (groupId: string, studentId: string) {
    const isStudentInGroup = await this.isStudentInGroup(groupId, studentId);
    if (!isStudentInGroup) throw new NoPermissionException();
    const { id: oldCaptainId } = await this.getCaptain(groupId);

    const newCaptainRole = await this.roleRepository.find({
      groupRole: {
        groupId,
      },
      userRoles: {
        some: {
          studentId,
        },
      },
    });

    const oldCaptainRole = await this.roleRepository.find({
      groupRole: {
        groupId,
      },
      userRoles: {
        some: {
          studentId: oldCaptainId,
        },
      },
    });

    await this.roleRepository.updateById(newCaptainRole.id, {
      userRoles: {
        updateMany: {
          where: {
            studentId,
          },
          data: {
            studentId: oldCaptainId,
          },
        },
      },
    });

    await this.roleRepository.updateById(oldCaptainRole.id, {
      userRoles: {
        updateMany: {
          where: {
            studentId: oldCaptainId,
          },
          data: {
            studentId,
          },
        },
      },
    });
  }

  private async isStudentInGroup (groupId: string, studentId: string) {
    const student = await this.studentRepository.findById(studentId);
    if (!student) throw new InvalidEntityIdException('User');
    return student.groupId === groupId;
  }
}
