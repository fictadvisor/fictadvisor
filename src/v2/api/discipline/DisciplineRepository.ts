import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class DisciplineRepository {

  private include = {
    subject: true,
    group: true,
    disciplineTypes: true,
    disciplineTeachers: {
      include: {
        teacher: true,
        roles: true,
      },
    },
  };

  constructor (
    private prisma: PrismaService,
  ) {}

  async findById (id: string) {
    return this.prisma.discipline.findUnique({
      where: {
        id,
      },
      include: this.include,
    });
  }

  async find (where: Prisma.DisciplineWhereInput) {
    return this.prisma.discipline.findFirst({
      where,
      include: this.include,
    });
  }

  async findMany (data: Prisma.DisciplineFindManyArgs) {
    return this.prisma.discipline.findMany({
      ...data,
      include: this.include,
    });
  }

  async create (data: Prisma.DisciplineUncheckedCreateInput) {
    return this.prisma.discipline.create({
      data,
      include: this.include,
    });
  }

  async getOrCreate (data: { subjectId: string, groupId: string, year: number, semester: number }) {
    let discipline = await this.find(data);
    if (!discipline) {
      discipline = await this.create(data);
    }
    return discipline;
  }

  async updateById (id: string, data: Prisma.DisciplineUncheckedUpdateInput) {
    return this.prisma.discipline.update({
      where: {
        id,
      },
      data,
      include: this.include,
    });
  }
}