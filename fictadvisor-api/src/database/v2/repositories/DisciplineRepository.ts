import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client/fictadvisor';
import { DbDiscipline } from '../entities/DbDiscipline';

@Injectable()
export class DisciplineRepository {

  private include = {
    subject: true,
    group: {
      include: {
        selectiveAmounts: true,
      },
    },
    disciplineTypes: true,
    disciplineTeachers: {
      include: {
        teacher: {
          include: {
            cathedras: {
              include: {
                cathedra: true,
              },
            },
          },
        },
        roles: {
          include: {
            disciplineType: true,
          },
        },
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
    }) as any as DbDiscipline;
  }

  async find (where: Prisma.DisciplineWhereInput): Promise<DbDiscipline> {
    return this.prisma.discipline.findFirst({
      where,
      include: this.include,
    }) as any as DbDiscipline;
  }

  async deleteById (id: string): Promise<DbDiscipline> {
    return this.prisma.discipline.delete({
      where: {
        id,
      },
      include: this.include,
    }) as any as DbDiscipline;
  }

  async findMany (args: Prisma.DisciplineFindManyArgs): Promise<DbDiscipline[]> {
    return this.prisma.discipline.findMany({
      ...args,
      include: this.include,
    }) as unknown as DbDiscipline[];
  }

  async create (data: Prisma.DisciplineUncheckedCreateInput) {
    return this.prisma.discipline.create({
      data,
      include: this.include,
    }) as any as DbDiscipline;
  }

  async getOrCreate (data: { subjectId: string, groupId: string, year: number, isSelective?: boolean, semester: number }) {
    let discipline = await this.find(data);
    if (!discipline) {
      discipline = await this.create(data) as DbDiscipline;
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
    }) as any as DbDiscipline;
  }

  async updateMany (where: Prisma.DisciplineWhereInput, data: Prisma.DisciplineUncheckedUpdateManyInput) {
    return this.prisma.discipline.updateMany({
      where,
      data,
    }) as any as DbDiscipline[];
  }

  async count (data: Prisma.DisciplineCountArgs): Promise<number> {
    return this.prisma.discipline.count(data);
  }
}
