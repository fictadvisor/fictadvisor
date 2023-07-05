import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../PrismaService';


@Injectable()
export class TeacherRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  private include = {
    cathedras: true,
    disciplineTeachers: {
      include: {
        discipline: true,
        roles: true,
      },
    },
  };

  async findMany (
    data: Prisma.TeacherFindManyArgs,
  ) {

    return this.prisma.teacher.findMany({
      include: this.include,
      ...data,
    });
  }

  async find (
    where: Prisma.TeacherWhereInput,
  ) {
    return this.prisma.teacher.findFirst({
      where,
      include: this.include,
    });
  }

  async findById (id: string) {
    return this.prisma.teacher.findUnique({
      where: {
        id,
      },
      include: this.include,
    });
  }

  async create (
    data: Prisma.TeacherUncheckedCreateInput,
  ) {
    return this.prisma.teacher.create({
      data,
      include: this.include,
    });
  }

  async getOrCreate (
    data: {lastName: string, firstName: string, middleName: string},
  ) {
    let teacher = await this.find(data);

    if (!teacher) {
      teacher = await this.create(data);
    }
    return teacher;
  }

  async update (where: Prisma.TeacherWhereUniqueInput, data: Prisma.TeacherUncheckedUpdateInput) {
    return this.prisma.teacher.update({
      where,
      data,
      include: this.include,
    });
  }

  async updateById (id: string, data: Prisma.TeacherUncheckedUpdateInput) {
    return this.prisma.teacher.update({
      where: {
        id,
      },
      data,
      include: this.include,
    });
  }

  async delete (where: Prisma.TeacherWhereUniqueInput) {
    return this.prisma.teacher.delete({
      where,
      include: this.include,
    });
  }

  async deleteById (
    id: string,
  ) {
    return this.prisma.teacher.delete({
      where: {
        id,
      },
      include: this.include,
    });
  }

  count (data: Prisma.TeacherCountArgs) {
    return this.prisma.teacher.count(
      data,
    );
  }
}
