import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { type Group, RoleName, State } from '@prisma/client';
import { DisciplineService } from '../discipline/DisciplineService';
import { DisciplineRepository } from '../discipline/DisciplineRepository';
import { GroupRepository } from './GroupRepository';
import { RoleRepository } from '../user/role/RoleRepository';
import { StudentRepository } from '../user/StudentRepository';
import { type QueryAllDTO } from '../../utils/QueryAllDTO';
import { UserRepository } from '../user/UserRepository';
import { type EmailDTO } from './dto/EmailDTO';
import { type ApproveDTO } from '../user/dto/ApproveDTO';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';
import { type RoleDTO } from './dto/RoleDTO';
import { type UpdateGroupDTO } from './dto/UpdateGroupDTO';

@Injectable()
export class GroupService {
  constructor (
    private readonly disciplineService: DisciplineService,
    private readonly disciplineRepository: DisciplineRepository,
    private readonly groupRepository: GroupRepository,
    private readonly prisma: PrismaService,
    private readonly roleRepository: RoleRepository,
    private readonly studentRepository: StudentRepository,
    private readonly userRepository: UserRepository
  ) {}

  async create (code: string): Promise<Group> {
    return await this.groupRepository.create(code);
  }

  async getAll (body: QueryAllDTO) {
    return await this.groupRepository.getAll(body);
  }

  async get (id: string) {
    return await this.groupRepository.getGroup(id);
  }

  async getDisciplineTeachers (groupId: string) {
    const disciplines = await this.getDisciplines(groupId);

    for (const discipline of disciplines) {
      discipline.teachers = await this.disciplineService.getTeachers(discipline.id);
    }

    return disciplines;
  }

  async getDisciplines (groupId: string) {
    const disciplines = await this.groupRepository.getDisciplines(groupId);
    const results = [];
    for (const discipline of disciplines) {
      const subject = await this.disciplineRepository.getSubject(discipline.id);
      results.push({
        id: discipline.id,
        subjectName: subject.name,
      });
    }

    return results;
  }

  async addUnregistered (groupId: string, body: EmailDTO) {
    const users = [];
    for (const email of body.emails) {
      const user = await this.userRepository.create({ email });
      await this.studentRepository.create({
        userId: user.id,
        groupId,
        state: State.APPROVED,
      });
      users.push({
        id: user.id,
        email: user.email,
      });
    }
    return { users };
  }

  async verifyStudent (groupId: string, userId: string, data: ApproveDTO) {
    const user = await this.userRepository.get(userId);

    if (user.student.groupId !== groupId) {
      throw new NoPermissionException();
    }

    await this.studentRepository.update(user.id, data);
  }

  async moderatorSwitch (groupId: string, userId: string, body: RoleDTO) {
    const user = await this.userRepository.get(userId);

    if (user.student.groupId !== groupId) {
      throw new NoPermissionException();
    }

    const roles = await this.groupRepository.getRoles(groupId);

    for (const role of roles) {
      if (role.name === body.roleName) {
        await this.studentRepository.addRole(userId, role.id);
      }
    }
  }

  async removeStudent (groupId: string, userId: string) {
    const user = await this.userRepository.get(userId);

    if (user.student.groupId !== groupId) {
      throw new NoPermissionException();
    }

    await this.studentRepository.update(user.id, { state: State.DECLINED });
  }

  async getCaptain (groupId: string) {
    const students = await this.groupRepository.getStudents(groupId);
    for (const student of students) {
      const roles = await this.studentRepository.getRoles(student.userId);
      for (const role of roles) {
        if (role.name == RoleName.CAPTAIN) {
          const user = await this.userRepository.get(student.userId);
          return {
            firstName: student.firstName,
            middleName: student.middleName,
            lastName: student.lastName,
            email: user.email,
            username: user.username,
            avatar: user.avatar,
          };
        }
      }
    }
    return null;
  }

  async deleteGroup (groupId: string) {
    await this.groupRepository.delete(groupId);
  }

  async getStudents (groupId: string) {
    let students = await this.groupRepository.getStudents(groupId);
    students = students.filter((st) => st.state === State.APPROVED);
    const results = [];
    for (const student of students) {
      const roles = await this.studentRepository.getRoles(student.userId);
      for (const role of roles) {
        const user = await this.userRepository.get(student.userId);
        results.push({
          firstName: student.firstName,
          middleName: student.middleName,
          lastName: student.lastName,
          email: user.email,
          avatar: user.avatar,
          role: role.name,
        });
      }
    }
    return { students: results };
  }

  async updateGroup (groupId: string, body: UpdateGroupDTO) {
    await this.groupRepository.updateGroup(groupId, body);
  }
}
