import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
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

  find (args: Prisma.StudentFindUniqueArgs) {
    return this.prisma.student.findUnique({
      ...args,
      include: this.include,
    });
  }

  findById (userId: string) {
    return this.find({
      where: {
        userId,
      },
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
