import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';
import { DbDisciplineTeacher } from '../entities/DbDisciplineTeacher';

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
    teacher: {
      include: {
        cathedras: {
          include: {
            cathedra: true,
          },
        },
      },
    },
  };

  constructor (
    private prisma: PrismaService,
  ) {}

  async findById (id: string): Promise<DbDisciplineTeacher> {
    return this.prisma.disciplineTeacher.findFirst({
      where: {
        id,
      },
      include: this.include,
    });
  }

  async create (data: Prisma.DisciplineTeacherUncheckedCreateInput): Promise<DbDisciplineTeacher> {
    return this.prisma.disciplineTeacher.create({
      data,
      include: this.include,
    });
  }

  async updateById (id: string, data: Prisma.DisciplineTeacherUncheckedUpdateInput): Promise<DbDisciplineTeacher> {
    return this.prisma.disciplineTeacher.update({
      where: {
        id,
      },
      data,
      include: this.include,
    });
  }

  async find (where: Prisma.DisciplineTeacherWhereInput): Promise<DbDisciplineTeacher> {
    return this.prisma.disciplineTeacher.findFirst({
      where,
      include: this.include,
    });
  }

  async getOrCreate (data: { teacherId: string, disciplineId: string }): Promise<DbDisciplineTeacher> {
    let disciplineTeacher = await this.find(data);
    if (!disciplineTeacher) {
      disciplineTeacher = await this.create(data);
    }
    return disciplineTeacher;
  }

  async deleteById (id: string): Promise<DbDisciplineTeacher> {
    return this.prisma.disciplineTeacher.delete({
      where: {
        id,
      },
      include: this.include,
    });
  }

  async findMany (data: Prisma.DisciplineTeacherFindManyArgs): Promise<DbDisciplineTeacher[]> {
    return this.prisma.disciplineTeacher.findMany({
      ...data,
      include: this.include,
    });
  }
}
