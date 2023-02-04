import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateDisciplineTeacherData } from './dto/CreateDisciplineTeacherData';

@Injectable()
export class DisciplineTeacherRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async get (id: string) {
    return this.prisma.disciplineTeacher.findUnique({
      where: {
        id,
      },
      include: {
        teacher: true,
        roles: true,
        questionAnswers: true,
        discipline: true,
      },
    });
  }

  async getDisciplineTeacher (id: string) {
    const disciplineTeacher = await this.get(id);
    delete disciplineTeacher.teacher;
    delete disciplineTeacher.roles;
    delete disciplineTeacher.discipline;
    return disciplineTeacher;
  }

  async getTeacher (id: string) {
    const disciplineTeacher = await this.get(id);
    return disciplineTeacher.teacher;
  }

  async getRoles (id: string) {
    const disciplineTeacher = await this.get(id);
    return disciplineTeacher.roles;
  }

  async getAnswers (id: string) {
    const disciplineTeacher = await this.get(id);
    return disciplineTeacher.questionAnswers;
  }

  async getDiscipline (id: string) {
    const disciplineTeacher = await this.get(id);
    return disciplineTeacher.discipline;
  }

  async create (data: CreateDisciplineTeacherData) {
    return this.prisma.disciplineTeacher.create({
      data,
    });
  }

  async find (data: CreateDisciplineTeacherData) {
    return this.prisma.disciplineTeacher.findFirst({
      where: data,
    });
  }

  async getOrCreate (data: CreateDisciplineTeacherData) {
    let disciplineTeacher = await this.find(data);
    if (!disciplineTeacher) {
      disciplineTeacher = await this.create(data);
    }
    return disciplineTeacher;
  }

  async delete (id: string) {
    return this.prisma.disciplineTeacher.delete({
      where: {
        id,
      },
    });
  }
}