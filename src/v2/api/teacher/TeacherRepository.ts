import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/PrismaService';


@Injectable()
export class TeacherRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async findMany (
    data: Prisma.TeacherFindManyArgs,
  ) {

    return this.prisma.teacher.findMany({
      ...data,
      include: {
        disciplineTeachers: {
          include: {
            discipline: true,
            roles: true,
          },
        },
      },
    });
  }

  async find (
    where: Prisma.TeacherWhereInput,
  ) {
    return this.prisma.teacher.findFirst({
      where,
      include: {
        disciplineTeachers: {
          include: {
            discipline: true,
            roles: true,
          },
        },
      },
    });
  }

  async findById (id: string) {
    return this.prisma.teacher.findUnique({
      where: {
        id,
      },
      include: {
        disciplineTeachers: {
          include: {
            discipline: true,
            roles: true,
          },
        },
      },
    });
  }

  async create (
    data: Prisma.TeacherUncheckedCreateInput,
  ) {
    return this.prisma.teacher.create({
      data,
      include: {
        disciplineTeachers: {
          include: {
            discipline: true,
            roles: true,
          },
        },
      },
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
    });
  }

  async updateById (id: string, data: Prisma.TeacherUncheckedUpdateInput) {
    return this.prisma.teacher.update({
      where: {
        id,
      },
      data,
      include: {
        disciplineTeachers: {
          include: {
            discipline: true,
            roles: true,
          },
        },
      },
    });
  }

  async delete (where: Prisma.TeacherWhereUniqueInput) {
    return this.prisma.teacher.delete({
      where,
    });
  }

  async deleteById (
    id: string,
  ) {
    return this.prisma.teacher.delete({
      where: {
        id,
      },
    });
  }

  count (data: Prisma.TeacherCountArgs) {
    return this.prisma.teacher.count(
      data,
    );
  }
}
