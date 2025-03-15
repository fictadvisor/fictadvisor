import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client/fictadvisor';
import { PrismaService } from '../prisma.service';
import { DbGroup } from '../entities/group.entity';

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

  async find (where: Prisma.GroupWhereInput): Promise<DbGroup> {
    return this.prisma.group.findFirst({
      where,
      include: this.include,
    }) as any as DbGroup;
  }

  async findById (id: string): Promise<DbGroup> {
    return this.prisma.group.findUnique({
      where: { id },
      include: this.include,
    }) as any as DbGroup;
  }

  async findMany (args: Prisma.GroupFindManyArgs): Promise<DbGroup[]> {
    return this.prisma.group.findMany({
      ...args,
      include: this.include,
    }) as any as DbGroup[];
  }

  async create (data: Prisma.GroupUncheckedCreateInput): Promise<DbGroup> {
    return this.prisma.group.create({
      data,
      include: this.include,
    }) as any as DbGroup;
  }

  async updateById (id: string, data: Prisma.GroupUncheckedUpdateInput): Promise<DbGroup> {
    return this.prisma.group.update({
      where: { id },
      data,
      include: this.include,
    }) as any as DbGroup;
  }

  async deleteById (id: string): Promise<DbGroup> {
    return this.prisma.group.delete({
      where: {
        id,
      },
      include: this.include,
    }) as any as DbGroup;
  }

  async count (data: Prisma.GroupCountArgs): Promise<number> {
    return this.prisma.group.count(data);
  }
}
