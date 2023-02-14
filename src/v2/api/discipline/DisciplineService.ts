import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateDisciplineDTO } from './dto/CreateDisciplineDTO';
import { User } from '@prisma/client';
import { TeacherService } from '../teacher/TeacherService';
import { DisciplineRepository } from './DisciplineRepository';
import { DisciplineTypeRepository } from './DisciplineTypeRepository';
import { DisciplineTeacherRepository } from '../teacher/DisciplineTeacherRepository';
import { DisciplineTypeService } from './DisciplineTypeService';
import { DisciplineTeacherService } from '../teacher/DisciplineTeacherService';

@Injectable()
export class DisciplineService {
  constructor(
    private disciplineRepository: DisciplineRepository,
    private disciplineTypeRepository: DisciplineTypeRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    @Inject(forwardRef(() => TeacherService))
    private teacherService: TeacherService,
    @Inject(forwardRef(() => DisciplineTeacherService))
    private disciplineTeacherService: DisciplineTeacherService,
    @Inject(forwardRef(() => DisciplineTypeService))
    private disciplineTypeService: DisciplineTypeService,
    private prisma: PrismaService,
  ) {}

  async create(body: CreateDisciplineDTO) {
    return this.disciplineRepository.create(body);
  }

  async get(id: string) {
    return this.disciplineRepository.getDiscipline(id);
  }

  async makeSelective(user: User, disciplineId: string) {
    return this.prisma.selectiveDiscipline.create({
      data: {
        studentId: user.id,
        disciplineId,
      },
    });
  }

  async getTeachers(id: string) {
    const disciplineTeachers = await this.disciplineRepository.getDisciplineTeachers(id);
    return this.disciplineTeacherService.getTeachers(disciplineTeachers);
  }
}