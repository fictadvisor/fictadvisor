import {Body, Injectable} from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import {Group, State} from '@prisma/client';
import { GetDTO } from '../teacher/dto/GetDTO';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { DisciplineService } from '../discipline/DisciplineService';
import { DisciplineRepository } from '../discipline/DisciplineRepository';
import { GroupRepository } from './GroupRepository';
import { EmailDTO } from "./dto/EmailDTO";
import { ApproveDTO } from "../user/dto/ApproveDTO";
import { NoPermissionException } from "../../utils/exceptions/NoPermissionException";
import { UserRepository } from "../user/UserRepository";
import { StudentRepository } from "../user/StudentRepository";
import {RoleDTO} from "./dto/RoleDTO";


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

  async getAll(body: GetDTO<Group>) {
    const search = DatabaseUtils.getSearch<Group>(body, 'code');
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
    await this.userRepository.addUnregistered(groupId, body);
  }

  async verifyStudent(groupId: string, email: string, data: ApproveDTO){
    const user = await this.userRepository.getByEmail(email);

    if (user.student.groupId !== groupId) {
      throw new NoPermissionException();
    }

    await this.studentRepository.updateState(user, data);
  }

  async adminSwitch(groupId: string, userId: string, body: RoleDTO){
    const  user = await this.userRepository.get(userId);

    if (user.student.groupId !== groupId) {
      throw new NoPermissionException();
    }

    if (body.status)
      await this.studentRepository.addRole(userId, body.roleId);
    else await this.studentRepository.removeRole(userId, body.roleId);
  }

  async removeStudent(groupId: string, userId: string){
    const user = await this.userRepository.get(userId);

    if (user.student.groupId !== groupId) {
      throw new NoPermissionException();
    }

    await this.studentRepository.updateState(user, {state: State.DECLINED});
  }
}