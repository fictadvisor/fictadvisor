import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateDisciplineDTO } from './dto/CreateDisciplineDTO';
import { User } from '@prisma/client';
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

  async create (body: CreateDisciplineDTO) {
    return this.disciplineRepository.create(body);
  }

  async get (id: string) {
    return this.disciplineRepository.getDiscipline(id);
  }

  async makeSelective (user: User, disciplineId: string) {
    return this.disciplineRepository.makeSelective({
      studentId: user.id,
      disciplineId,
    });
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

  getDisciplinesWithTeachers (disciplines: any[]) {
    return disciplines.map((d) => ({
      id: d.id,
      subject: d.subject,
      year: d.year,
      semester: d.semester,
      isSelective: d.isSelective,
      teachers: this.disciplineTeacherMapper.getDisciplineTeachersWithTeacherParams(d.disciplineTeachers),
    }));
  }
}
