import { Injectable } from '@nestjs/common';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { DisciplineTeacherMapper } from '../../mappers/DisciplineTeacherMapper';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { DisciplineTypeEnum } from '@prisma/client';
import { TeacherRoleAdapter } from '../../mappers/TeacherRoleAdapter';
import { CreateDisciplineDTO } from '../dtos/CreateDisciplineDTO';

@Injectable()
export class DisciplineService {
  constructor (
    private disciplineRepository: DisciplineRepository,
    private disciplineTeacherMapper: DisciplineTeacherMapper,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
  ) {}

  async create (data: CreateDisciplineDTO) {
    return this.disciplineRepository.create(data);
  }

  async get (id: string) {
    return this.disciplineRepository.findById(id);
  }

  async getTeachers (disciplineId: string, disciplineType: DisciplineTypeEnum) {
    const role = TeacherRoleAdapter[disciplineType];
    const disciplineTeachers = await this.disciplineTeacherRepository.findMany({
      where: {
        roles: {
          some: {
            role,
          },
        },
        discipline: {
          id: disciplineId,
        },
      },
    });
    return this.disciplineTeacherMapper.getDisciplineTeachersWithTeacherParams(disciplineTeachers);
  }
}
