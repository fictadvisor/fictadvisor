import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';
import { DbGroup } from '../entities/DbGroup';

@Injectable()
export class GroupRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  private include = {
    selectiveAmounts: true,
    telegramGroups: true,
    cathedra: true,
    educationalProgram: {
      include: {
        speciality: true,
      },
    },
    students: {
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    },
  };

  async find (where: Prisma.GroupWhereInput) {
    return this.prisma.group.findFirst({
      where,
      include: this.include,
    });
  }

  async findById (id: string) {
    return this.prisma.group.findUnique({
      where: {
        id,
      },
      include: this.include,
    }) as any as DbGroup;
  }

  async findMany (args: Prisma.GroupFindManyArgs) {
    return this.prisma.group.findMany({
      ...args,
      include: this.include,
    });
  }

  async getOrCreate (code: string) {
    const group = await this.find({ code });
    if (!group) {
      return this.create({ code });
    }
    return group;
  }

  async create (data: Prisma.GroupUncheckedCreateInput) : Promise<DbGroup> {
    return this.prisma.group.create({
      data,
      include: this.include,
    }) as any as DbGroup;
  }

  async updateById (id: string, data: Prisma.GroupUncheckedUpdateInput) {
    return this.prisma.group.update({
      where: {
        id,
      },
      data,
      include: this.include,
    }) as any as DbGroup;
  }

  async deleteById (id: string) {
    return this.prisma.group.delete({
      where: {
        id,
      },
      include: this.include,
    }) as any as DbGroup;
  }

  async count (data: Prisma.GroupCountArgs) {
    return this.prisma.group.count(
      data,
    );
  }
}
