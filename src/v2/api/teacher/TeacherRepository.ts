import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';

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
}