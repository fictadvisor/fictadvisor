import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor (private prisma: PrismaService) {}

  async create (data: Prisma.UserUncheckedCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  async find (where: Prisma.UserWhereInput) {
    return this.prisma.user.findFirst({
      where,
      include: {
        student: {
          include: {
            group: true,
          },
        },
      },
    });
  }

  async findById (id: string) {
    return this.prisma.user.findFirst({
      where: { id },
      include: {
        student: {
          include: {
            group: true,
          },
        },
      },
    });
  }

  async delete (where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
    });
  }

  async deleteById (id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async update (where: Prisma.UserWhereUniqueInput, data: Prisma.UserUncheckedUpdateInput) {
    return this.prisma.user.update({
      where,
      data,
      include: {
        student: {
          include: {
            group: true,
          },
        },
      },
    });
  }

  async updateById (id: string, data: Prisma.UserUncheckedUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        student: {
          include: {
            group: true,
          },
        },
      },
    });
  }

  async updateMany (where: Prisma.UserWhereInput, data: Prisma.UserUncheckedUpdateInput) {
    return this.prisma.user.updateMany({
      where,
      data,
    });
  }
}
