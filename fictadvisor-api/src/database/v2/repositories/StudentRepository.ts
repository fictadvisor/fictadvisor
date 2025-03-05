import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client/fictadvisor';
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

  async create (data: Prisma.StudentUncheckedCreateInput): Promise<DbStudent> {
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
    }) as any as DbStudent[];
  }

  async updateById (userId: string, data: Prisma.StudentUncheckedUpdateInput): Promise<DbStudent> {
    return this.prisma.student.update({
      where: { userId },
      data,
      include: this.include,
    }) as any as DbStudent;
  }

  async updateMany (where: Prisma.StudentWhereInput, data: Prisma.StudentUncheckedUpdateManyInput): Promise<DbStudent[]> {
    return this.prisma.student.updateMany({
      where,
      data,
    }) as any as DbStudent[];
  }

  async delete (args: Prisma.StudentDeleteArgs): Promise<DbStudent> {
    return this.prisma.student.delete({
      ...args,
      include: this.include,
    }) as any as DbStudent;
  }

  async deleteById (userId: string): Promise<DbStudent> {
    return this.delete({
      where: {
        userId,
      },
    });
  }

  async count (data: Prisma.StudentCountArgs): Promise<number> {
    return this.prisma.student.count(data);
  }
}
