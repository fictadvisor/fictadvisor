import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class DisciplineTeacherRepository {

  private include = {
    discipline: {
      include: {
        group: true,
        subject: true,
        disciplineTypes: true,
      },
    },
    roles: true,
    teacher: true,
  };

  constructor (
    private prisma: PrismaService,
  ) {}

  async findById (id: string) {
    return this.prisma.disciplineTeacher.findUnique({
      where: {
        id,
      },
      include: this.include,
    });
  }

  async create (data: Prisma.DisciplineTeacherUncheckedCreateInput) {
    return this.prisma.disciplineTeacher.create({
      data,
      include: this.include,
    });
  }

  async updateById (id: string, data: Prisma.DisciplineTeacherUncheckedUpdateInput) {
    return this.prisma.disciplineTeacher.update({
      where: {
        id,
      },
      data,
      include: this.include,
    });
  }

  async find (where: Prisma.DisciplineTeacherWhereInput) {
    return this.prisma.disciplineTeacher.findFirst({
      where,
      include: this.include,
    });
  }

  async getOrCreate (data: { teacherId: string, disciplineId: string }) {
    let disciplineTeacher = await this.find(data);
    if (!disciplineTeacher) {
      disciplineTeacher = await this.create(data);
    }
    return disciplineTeacher;
  }

  async deleteById (id: string) {
    return this.prisma.disciplineTeacher.delete({
      where: {
        id,
      },
      include: this.include,
    });
  }

  findMany (data: Prisma.DisciplineTeacherFindManyArgs): any {
    return this.prisma.disciplineTeacher.findMany({
      ...data,
      include: this.include,
    });
  }
}
