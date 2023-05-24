import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class GroupRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async find (where: Prisma.GroupWhereInput) {
    return this.prisma.group.findFirst({
      where,
    });
  }

  async findById (id: string) {
    return this.prisma.group.findUnique({
      where: {
        id,
      },
    });
  }

  async findMany (data: Prisma.GroupFindManyArgs) {
    return this.prisma.group.findMany({
      ...data,
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
    });
  }

  async updateById (id: string, data: Prisma.GroupUncheckedUpdateInput) {
    return this.prisma.group.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteById (id: string) {
    return this.prisma.group.delete({
      where: {
        id,
      },
    });
  }
}
