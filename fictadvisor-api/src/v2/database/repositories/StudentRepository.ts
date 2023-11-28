import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';
import { DbStudent } from '../entities/DbStudent';

@Injectable()
export class StudentRepository {

  private include = {
    group: true,
    roles: {
      include: {
        role: true,
      },
    },
    selectiveDisciplines: {
      include: {
        discipline: true,
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

  find (where: Prisma.StudentWhereInput): Promise<DbStudent> {
    return this.prisma.student.findFirst({
      where,
      include: this.include,
    });
  }

  findById (userId: string): Promise<DbStudent> {
    return this.find({ userId });
  }

  findMany (args: Prisma.StudentFindManyArgs): Promise<DbStudent[]> {
    return this.prisma.student.findMany({
      ...args,
      include: this.include,
    })as unknown as Promise<DbStudent[]>;
  }

  async updateById (userId: string, data: Prisma.StudentUncheckedUpdateInput) {
    return this.prisma.student.update({
      where: { userId },
      data,
      include: this.include,
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

  async count (data: Prisma.StudentCountArgs) {
    return this.prisma.student.count(data);
  }
}
