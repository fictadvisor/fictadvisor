import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { GetDTO } from './dto/GetDTO';
import { CreateTeacherDTO } from './dto/CreateTeacherDTO';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { Teacher } from '@prisma/client';
import { TeacherRepository } from './TeacherRepository';
import { DisciplineTeacherRepository } from './DisciplineTeacherRepository';
import { DisciplineTypeRepository } from '../discipline/DisciplineTypeRepository';


@Injectable()
export class TeacherService {
  constructor(
    private teacherRepository: TeacherRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTypeRepository: DisciplineTypeRepository,
    private prisma: PrismaService
  ) {}


  async getAll(body: GetDTO<Teacher>) {
    const search = DatabaseUtils.getSearch<Teacher>(body, 'firstName', 'lastName', 'middleName');
    const page = DatabaseUtils.getPage(body);
    const sort = DatabaseUtils.getSort(body);

    return await this.prisma.teacher.findMany({
      ...page,
      ...sort,
      where: {
        ...search,
      },
    });
  }

  async create(body: CreateTeacherDTO) {
    return await this.prisma.teacher.create({
      data: body,
    });
  }

  async get(id: string) {
    return this.teacherRepository.getTeacher(id);
  }

  async delete(teacherId: string) {
    return this.teacherRepository.delete(teacherId);
  }
}