import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateTeacherDTO } from './dto/CreateTeacherDTO';

@Injectable()
export class TeacherRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async get(id: string) {
    return this.prisma.teacher.findUnique({
      where: {
        id,
      },
      include: {
        disciplineTeachers: true,
        temporaryLessons: true,
      },
    });
  }

  async getTeacher(id: string) {
    const teacher = await this.get(id);
    delete teacher.disciplineTeachers;
    delete teacher.temporaryLessons;
    return teacher;
  }

  async getDisciplineTeachers(id: string) {
    const group = await this.get(id);
    return group.disciplineTeachers;
  }

  async getTemporaryLessons(id: string) {
    const group = await this.get(id);
    return group.temporaryLessons;
  }

  async delete(id: string) {
    return this.prisma.teacher.delete({
      where: {
        id,
      },
    });
  }

  async find(where: CreateTeacherDTO) {
    return this.prisma.teacher.findFirst({
      where,
    });
  }

  async create(data: CreateTeacherDTO) {
    return this.prisma.teacher.create({
      data,
    });
  }

  async getOrCreate(data: CreateTeacherDTO) {
    let teacher = await this.find(data);
    if (!teacher) {
      teacher = await this.create(data);
    }
    return teacher;
  }
}