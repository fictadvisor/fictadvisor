import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class GroupRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  private include = {
    selectiveAmounts: true,
    telegramGroups: true,
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
    });
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

  async create (data: Prisma.GroupUncheckedCreateInput) {
    return this.prisma.group.create({
      data,
      include: this.include,
    });
  }

  async updateById (id: string, data: Prisma.GroupUncheckedUpdateInput) {
    return this.prisma.group.update({
      where: {
        id,
      },
      data,
      include: this.include,
    });
  }

  async deleteById (id: string) {
    return this.prisma.group.delete({
      where: {
        id,
      },
      include: this.include,
    });
  }

  async count (data: Prisma.GroupCountArgs) {
    return this.prisma.group.count(
      data,
    );
  }
}
