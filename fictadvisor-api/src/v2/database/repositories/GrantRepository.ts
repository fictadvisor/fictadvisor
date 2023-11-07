import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { UpdateGrantDTO } from '../../api/dtos/UpdateGrantDTO';
import { Prisma } from '@prisma/client';

@Injectable()
export class GrantRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async create (data: Prisma.GrantUncheckedCreateInput) {
    return this.prisma.grant.create({
      data,
      include: {
        role: true,
      },
    });
  }

  createMany (data: Prisma.GrantCreateManyInput[]) {
    return this.prisma.grant.createMany({
      data,
    });
  }

  async find (where: Prisma.GrantWhereInput) {
    return this.prisma.grant.findFirst({
      where,
      include: {
        role: true,
      },
    });
  }

  async findMany (args?: Prisma.GrantFindManyArgs) {
    return this.prisma.grant.findMany({
      include: {
        role: true,
      },
      ...args,
    });
  }

  async findById (id: string) {
    return this.prisma.grant.findFirst({
      where: {
        id,
      },
      include: {
        role: true,
      },
    });
  }

  delete (where: Prisma.GrantWhereUniqueInput) {
    return this.prisma.grant.delete({
      where,
      include: {
        role: true,
      },
    });
  }

  deleteById (id: string) {
    return this.prisma.grant.delete({
      where: {
        id,
      },
      include: {
        role: true,
      },
    });
  }

  async update (where: Prisma.GrantWhereUniqueInput, data: UpdateGrantDTO) {
    return this.prisma.grant.update({
      where,
      data,
      include: {
        role: true,
      },
    });
  }

  async updateById (id: string, data: UpdateGrantDTO) {
    return this.prisma.grant.update({
      where: {
        id,
      },
      data,
      include: {
        role: true,
      },
    });
  }

  async count (data: Prisma.GrantCountArgs) {
    return this.prisma.grant.count(
      data,
    );
  }
}