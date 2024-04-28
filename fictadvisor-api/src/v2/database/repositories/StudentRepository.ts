import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';
import { DbStudent } from '../entities/DbStudent';

@Injectable()
export class StudentRepository {

  private include = {
    group: {
      include: {
        cathedra: true,
        educationalProgram: {
          include: {
            speciality: true,
          },
        },
      },
    },
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
    }) as any as DbStudent;
  }

  async find (where: Prisma.StudentWhereInput): Promise<DbStudent> {
    return this.prisma.student.findFirst({
      where,
      include: this.include,
    }) as any as DbStudent;
  }

  async findById (userId: string): Promise<DbStudent> {
    return this.find({ userId });
  }

  async findMany (args: Prisma.StudentFindManyArgs): Promise<DbStudent[]> {
    return this.prisma.student.findMany({
      ...args,
      include: this.include,
    }) as unknown as DbStudent[];
  }

  async updateById (userId: string, data: Prisma.StudentUncheckedUpdateInput) {
    return this.prisma.student.update({
      where: { userId },
      data,
      include: this.include,
    }) as any as DbStudent;
  }

  async updateMany (where: Prisma.StudentWhereInput, data: Prisma.StudentUncheckedUpdateManyInput) {
    return this.prisma.student.updateMany({
      where,
      data,
    }) as any as DbStudent[];
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
