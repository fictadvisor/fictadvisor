import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { type CreateDisciplineDTO } from './dto/CreateDisciplineDTO';
import { type User } from '@prisma/client';
import { TeacherService } from '../teacher/TeacherService';
import { DisciplineRepository } from './DisciplineRepository';
import { DisciplineTypeRepository } from './DisciplineTypeRepository';
import { DisciplineTeacherRepository } from '../teacher/DisciplineTeacherRepository';
import { DisciplineTypeService } from './DisciplineTypeService';
import { DisciplineTeacherService } from '../teacher/DisciplineTeacherService';

@Injectable()
export class DisciplineService {
  constructor (
    private readonly disciplineRepository: DisciplineRepository,
    private readonly disciplineTypeRepository: DisciplineTypeRepository,
    private readonly disciplineTeacherRepository: DisciplineTeacherRepository,
    @Inject(forwardRef(() => TeacherService))
    private readonly teacherService: TeacherService,
    @Inject(forwardRef(() => DisciplineTeacherService))
    private readonly disciplineTeacherService: DisciplineTeacherService,
    @Inject(forwardRef(() => DisciplineTypeService))
    private readonly disciplineTypeService: DisciplineTypeService,
    private readonly prisma: PrismaService
  ) {}

  async create (body: CreateDisciplineDTO) {
    return await this.disciplineRepository.create(body);
  }

  async get (id: string) {
    return await this.disciplineRepository.getDiscipline(id);
  }

  async makeSelective (user: User, disciplineId: string) {
    return await this.prisma.selectiveDiscipline.create({
      data: {
        studentId: user.id,
        disciplineId,
      },
    });
  }

  async getSelective (studentId: string) {
    const selectiveDisciplines = await this.prisma.selectiveDiscipline.findMany({
      where: {
        studentId,
      },
      include: {
        discipline: true,
      },
    });

    return selectiveDisciplines.map((sd) => sd.discipline);
  }

  async getTeachers (id: string) {
    const results = [];

    const disciplineTeachers = await this.disciplineRepository.getDisciplineTeachers(id);
    for (const disciplineTeacher of disciplineTeachers) {
      results.push(await this.disciplineTeacherService.getDisciplineTeacher(disciplineTeacher.id));
    }

    return results;
  }
}
