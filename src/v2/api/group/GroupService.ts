import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { Group, State } from '@prisma/client';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { DisciplineService } from '../discipline/DisciplineService';
import { DisciplineRepository } from '../discipline/DisciplineRepository';
import { GroupRepository } from './GroupRepository';
import { EmailDTO } from "./dto/EmailDTO";
import { ApproveDTO } from "../user/dto/ApproveDTO";
import { NoPermissionException } from "../../utils/exceptions/NoPermissionException";
import { UserRepository } from "../user/UserRepository";
import { StudentRepository } from "../user/StudentRepository";
import { RoleDTO } from "./dto/RoleDTO";
import { QueryAllDTO } from '../../utils/QueryAllDTO';


@Injectable()
export class GroupService {
  constructor(
    private disciplineService: DisciplineService,
    private disciplineRepository: DisciplineRepository,
    private groupRepository: GroupRepository,
    private prisma: PrismaService,
    private userRepository: UserRepository,
    private studentRepository: StudentRepository
  ) {}

  async create(code: string): Promise<Group>  {
    return await this.prisma.group.create({
      data: {
        code,
      },
    });
  }

  async getAll(body: QueryAllDTO) {
    const search = DatabaseUtils.getSearch(body, 'code');
    const page = DatabaseUtils.getPage(body);
    const sort = DatabaseUtils.getSort(body);

    return await this.prisma.group.findMany({
      ...page,
      ...sort,
      where: {
        ...search,
      },
    });
  }

  async get(id: string) {
    return await this.prisma.group.findUnique({
      where: {
        id,
      },
    });
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

  async removeStudent(groupId: string, userId: string){
    const user = await this.userRepository.get(userId);

    if (user.student.groupId !== groupId) {
      throw new NoPermissionException();
    }

    await this.studentRepository.update(user.id, { state: State.DECLINED });
  }
}