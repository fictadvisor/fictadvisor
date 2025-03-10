import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client/fictadvisor';
import { PrismaService } from '../PrismaService';
import { DbTeacher } from '../entities/DbTeacher';


@Injectable()
export class TeacherRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  private include = {
    cathedras: {
      include: {
        cathedra: true,
      },
    },
    disciplineTeachers: {
      include: {
        discipline: true,
        roles: {
          include: {
            disciplineType: true,
          },
        },
      },
    },
  };

  async findMany (data: Prisma.TeacherFindManyArgs): Promise<DbTeacher[]> {
    return this.prisma.teacher.findMany({
      include: this.include,
      ...data,
    }) as any as DbTeacher[];
  }

  async find (
    where: Prisma.TeacherWhereInput,
  ): Promise<DbTeacher> {
    return this.prisma.teacher.findFirst({
      where,
      include: this.include,
    }) as any as DbTeacher;
  }

  async findById (id: string): Promise<DbTeacher> {
    return this.prisma.teacher.findUnique({
      where: {
        id,
      },
      include: this.include,
    }) as any as DbTeacher;
  }

  async create (
    data: Prisma.TeacherUncheckedCreateInput,
  ): Promise<DbTeacher> {
    return this.prisma.teacher.create({
      data,
      include: this.include,
    }) as any as DbTeacher;
  }

  async getOrCreate (
    data: {lastName: string, firstName: string, middleName: string},
  ): Promise<DbTeacher> {
    const teacher = await this.find(data);
    if (!teacher) {
      return this.create(data);
    }
    return teacher;
  }

  async update (where: Prisma.TeacherWhereUniqueInput, data: Prisma.TeacherUncheckedUpdateInput): Promise<DbTeacher> {
    return this.prisma.teacher.update({
      where,
      data,
      include: this.include,
    }) as any as DbTeacher;
  }

  async updateById (id: string, data: Prisma.TeacherUncheckedUpdateInput): Promise<DbTeacher> {
    return this.prisma.teacher.update({
      where: {
        id,
      },
      data,
      include: this.include,
    }) as any as DbTeacher;
  }

  async delete (where: Prisma.TeacherWhereUniqueInput): Promise<DbTeacher> {
    return this.prisma.teacher.delete({
      where,
      include: this.include,
    }) as any as DbTeacher;
  }

  async deleteById (id: string): Promise<DbTeacher> {
    return this.prisma.teacher.delete({
      where: {
        id,
      },
      include: this.include,
    }) as any as DbTeacher;
  }

  async count (data: Prisma.TeacherCountArgs): Promise<number> {
    return this.prisma.teacher.count(
      data,
    );
  }
}
