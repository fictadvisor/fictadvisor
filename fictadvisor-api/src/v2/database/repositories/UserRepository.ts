import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';
import { DbUser } from '../entities/DbUser';

@Injectable()
export class UserRepository {

  private include = {
    student: {
      include: {
        group: true,
      },
    },
  };

  constructor (private prisma: PrismaService) {}

  async create (data: Prisma.UserUncheckedCreateInput): Promise<DbUser> {
    return this.prisma.user.create({
      data,
      include: this.include,
    }) as any as DbUser;
  }

  async find (where: Prisma.UserWhereInput): Promise<DbUser> {
    return this.prisma.user.findFirst({
      where,
      include: this.include,
    }) as any as DbUser;
  }

  async findById (id: string): Promise<DbUser> {
    return this.prisma.user.findFirst({
      where: { id },
      include: this.include,
    }) as any as DbUser;
  }

  findMany (args?: Prisma.UserFindManyArgs): Promise<DbUser[]> {
    return this.prisma.user.findMany({
      ...args,
      include: this.include,
    }) as unknown as Promise<DbUser[]>;
  }

  async delete (where: Prisma.UserWhereUniqueInput): Promise<DbUser> {
    return this.prisma.user.delete({
      where,
      include: this.include,
    }) as any as DbUser;
  }

  async deleteById (id: string): Promise<DbUser> {
    return this.prisma.user.delete({
      where: { id },
      include: this.include,
    }) as any as DbUser;
  }

  async update (where: Prisma.UserWhereUniqueInput, data: Prisma.UserUncheckedUpdateInput): Promise<DbUser> {
    return this.prisma.user.update({
      where,
      data,
      include: this.include,
    }) as any as DbUser;
  }

  async updateById (id: string, data: Prisma.UserUncheckedUpdateInput): Promise<DbUser> {
    return this.prisma.user.update({
      where: { id },
      data,
      include: this.include,
    }) as any as DbUser;
  }

  async updateMany (where: Prisma.UserWhereInput, data: Prisma.UserUncheckedUpdateInput) {
    return this.prisma.user.updateMany({
      where,
      data,
    });
  }

  async count (data: Prisma.UserCountArgs) {
    return this.prisma.user.count(data);
  }
}
