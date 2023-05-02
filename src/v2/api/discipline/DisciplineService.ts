import { Injectable } from '@nestjs/common';
import { DisciplineRepository } from './DisciplineRepository';
import { DisciplineTeacherMapper } from '../teacher/DisciplineTeacherMapper';
import { DisciplineTeacherRepository } from '../teacher/DisciplineTeacherRepository';

@Injectable()
export class DisciplineService {
  constructor (
    private disciplineRepository: DisciplineRepository,
    private disciplineTeacherMapper: DisciplineTeacherMapper,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
  ) {}

  async create (data: { subjectId: string, groupId: string, year: number, semester: number }) {
    return this.disciplineRepository.create(data);
  }

  async get (id: string) {
    return this.disciplineRepository.findById(id);
  }

  async getTeachers (id: string) {
    const disciplineTeachers = await this.disciplineTeacherRepository.findMany({
      where: {
        discipline: {
          id,
        },
      },
    });
    return this.disciplineTeacherMapper.getDisciplineTeachersWithTeacherParams(disciplineTeachers);
  }
}
