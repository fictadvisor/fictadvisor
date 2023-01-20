import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { Group } from '@prisma/client';
import { GetDTO } from '../teacher/dto/GetDTO';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { DisciplineService } from '../discipline/DisciplineService';
import { SubjectService } from '../subject/SubjectService';
import { DisciplineRepository } from '../discipline/DisciplineRepository';
import { GroupRepository } from './GroupRepository';

@Injectable()
export class GroupService {
  constructor(
    private disciplineService: DisciplineService,
    private disciplineRepository: DisciplineRepository,
    private groupRepository: GroupRepository,
    private prisma: PrismaService,
    private subjectService: SubjectService,
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
}