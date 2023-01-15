import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateDisciplineTeacherData } from './dto/CreateDisciplineTeacherData';

@Injectable()
export class DisciplineTeacherRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async get(id: string) {
    return this.prisma.disciplineTeacher.findUnique({
      where: {
        id,
      },
      include: {
        teacher: true,
        disciplineType: true,
        questionAnswers: true,
      },
    });
  }

  async getDisciplineTeacher(id: string) {
    const disciplineTeacher = await this.get(id);
    delete disciplineTeacher.teacher;
    delete disciplineTeacher.disciplineType;
    return disciplineTeacher;
  }

  async getTeacher(id: string) {
    const disciplineTeacher = await this.get(id);
    return disciplineTeacher.teacher;
  }

  async getDisciplineType(id: string) {
    const disciplineTeacher = await this.get(id);
    return disciplineTeacher.disciplineType;
  }

  async getAnswers(id: string) {
    const disciplineTeacher = await this.get(id);
    return disciplineTeacher.questionAnswers;
  }

  async create(data: CreateDisciplineTeacherData) {
    return this.prisma.disciplineTeacher.create({
      data,
    });
  }

  async find(data: CreateDisciplineTeacherData) {
    return this.prisma.disciplineTeacher.findFirst({
      where: data,
    });
  }

  async getOrCreate(data: CreateDisciplineTeacherData) {
    let disciplineTeacher = await this.find(data);
    if (!disciplineTeacher){
      disciplineTeacher = await this.create(data);
    }
    return disciplineTeacher;
  }
}