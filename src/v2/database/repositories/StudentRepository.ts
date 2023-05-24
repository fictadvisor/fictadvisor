import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentRepository {

  private include = {
    group: true,
    roles: {
      include: {
        role: true,
      },
    },
    user: true,
  };

  constructor (
    private prisma: PrismaService,
  ) {}

  async create (data: Prisma.StudentUncheckedCreateInput) {
    return this.prisma.student.create({
      data,
      include: this.include,
    });
  }

  find (where: Prisma.StudentWhereInput) {
    return this.prisma.student.findFirst({
      where,
      include: this.include,
    });
  }

  findById (userId: string) {
    return this.find({ userId });
  }

  findMany (data: Prisma.StudentFindManyArgs) {
    return this.prisma.student.findMany({
      ...data,
      include: this.include,
    });
  }

  update (args: Prisma.StudentUpdateArgs) {
    return this.prisma.student.update({
      ...args,
      include: this.include,
    });
  }

  updateById (userId: string, data: Prisma.StudentUncheckedUpdateInput) {
    return this.update({
      where: {
        userId,
      },
      data,
    });
  }

  async delete (args: Prisma.StudentDeleteArgs) {
    await this.prisma.student.delete({
      ...args,
      include: this.include,
    });
  }
  
  async deleteById (userId: string) {
    await this.delete({
      where: {
        userId,
      },
    });
  }
}
