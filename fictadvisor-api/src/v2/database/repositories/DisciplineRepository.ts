import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';
import { DbDiscipline } from '../entities/DbDiscipline';

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

  async findById (id: string): Promise<DbDiscipline> {
    return this.prisma.discipline.findFirst({
      where: {
        id,
      },
      include: this.include,
    });
  }

  async find (where: Prisma.DisciplineWhereInput): Promise<DbDiscipline> {
    return this.prisma.discipline.findFirst({
      where,
      include: this.include,
    });
  }

  async deleteById (id: string): Promise<DbDiscipline> {
    return this.prisma.discipline.delete({
      where: {
        id,
      },
      include: this.include,
    });
  }

  async findMany (where: Prisma.DisciplineWhereInput): Promise<DbDiscipline[]> {
    return this.prisma.discipline.findMany({
      where,
      include: this.include,
    });
  }

  async create (data: Prisma.DisciplineUncheckedCreateInput) {
    return this.prisma.discipline.create({
      data,
      include: this.include,
    });
  }

  async getOrCreate (data: { subjectId: string, groupId: string, year: number, isSelective?: boolean, semester: number }) {
    let discipline = await this.find(data);
    if (!discipline) {
      discipline = await this.create(data);
    }
    return discipline;
  }

  async updateById (id: string, data: Prisma.DisciplineUncheckedUpdateInput): Promise<DbDiscipline> {
    return this.prisma.discipline.update({
      where: {
        id,
      },
      data,
      include: this.include,
    });
  }

  async updateMany (where: Prisma.DisciplineWhereInput, data: Prisma.DisciplineUncheckedUpdateManyInput) {
    return this.prisma.discipline.updateMany({ where, data });
  }
}
