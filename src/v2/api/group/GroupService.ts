import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { Group, RoleName, State, User } from '@prisma/client';
import { DisciplineService } from '../discipline/DisciplineService';
import { DisciplineRepository } from '../discipline/DisciplineRepository';
import { GroupRepository } from './GroupRepository';
import { StudentRepository } from "../user/StudentRepository";
import { QueryAllDTO } from "../../utils/QueryAllDTO";
import { UserRepository } from "../user/UserRepository";
import { EmailDTO } from "./dto/EmailDTO";
import { ApproveDTO } from "../user/dto/ApproveDTO";
import { NoPermissionException } from "../../utils/exceptions/NoPermissionException";
import { RoleDTO } from "./dto/RoleDTO";
import { UpdateGroupDTO } from "./dto/UpdateGroupDTO";
import { UserService } from '../user/UserService';

@Injectable()
export class GroupService {
  constructor(
    private disciplineService: DisciplineService,
    private disciplineRepository: DisciplineRepository,
    private groupRepository: GroupRepository,
    private prisma: PrismaService,
    private userService: UserService,
    private studentRepository: StudentRepository,
    private userRepository: UserRepository,
  ) {}

  async create(code: string): Promise<Group>  {
    return this.groupRepository.create(code);
  }

  async getAll(body: QueryAllDTO) {
    return this.groupRepository.getAll(body);
  }

  async get(id: string) {
    return this.groupRepository.getGroup(id);
  }

  async getDisciplineTeachers(groupId: string) {
    const disciplines = await this.getDisciplines(groupId);

    for (const discipline of disciplines) {
      discipline.teachers = await this.disciplineService.getTeachers(discipline.id);
    }

    return disciplines;
  }

  async getDisciplines(groupId: string) {
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

  async addUnregistered(groupId: string, body: EmailDTO) {
    const users = [];
    for (const email of body.emails) {
      const user = await this.userRepository.create({ email });
      await this.studentRepository.create({
        userId: user.id,
        groupId: groupId,
        state: State.APPROVED,
      });
      users.push({
        id: user.id,
        email: user.email,
      });
    }
    return { users };
  }

  async verifyStudent(groupId: string, userId: string, data: ApproveDTO){
    const user = await this.userRepository.get(userId);

    if (user.student.groupId !== groupId) {
      throw new NoPermissionException();
    }

    await this.studentRepository.update(user.id, data);
  }

  async moderatorSwitch(groupId: string, userId: string, body: RoleDTO){
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

  async removeStudent(groupId: string, userId: string, reqUser: User) {
    const userGroupRole = await this.userService.getGroupRole(userId);
    const reqUserGroupRole = await this.userService.getGroupRole(reqUser.id);

    if(reqUserGroupRole.groupRole.weight <= userGroupRole.groupRole.weight) {
      throw new NoPermissionException();
    }
    if (userGroupRole.groupId !== groupId) {
      throw new NoPermissionException();
    }

    await this.studentRepository.update(userId, { state: State.DECLINED });
  }

  async getCaptain(groupId: string) {
    const students = await this.groupRepository.getStudents(groupId);
    for (const student of students) {
      const roles = await this.studentRepository.getRoles(student.userId);
      for (const role of roles){
        if (role.name == RoleName.CAPTAIN){
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

  async deleteGroup(groupId: string) {
    await this.groupRepository.delete(groupId);
  }

  async getStudents(groupId: string) {
    let students = await this.groupRepository.getStudents(groupId);
    students = students.filter((st) => st.state === State.APPROVED);
    const results = [];
    for (const student of students) {
      const roles = await this.studentRepository.getRoles(student.userId);
      const user = await this.userRepository.get(student.userId);
      results.push({
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
        email: user.email,
        avatar: user.avatar,
        role: [RoleName.CAPTAIN, RoleName.MODERATOR, RoleName.STUDENT].find((r) => roles.some((r2) => r2.name === r)),
      });
    }
    return { students: results };
  }

  async updateGroup(groupId: string, body: UpdateGroupDTO){
    await this.groupRepository.updateGroup(groupId, body);
  }
}