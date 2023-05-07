import { Injectable } from '@nestjs/common';
import { CreateStudentData } from './data/СreateStudentData';
import { UpdateStudentData } from './data/UpdateStudentData';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class StudentRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async getRoles (studentId: string) {
    const roles = await this.prisma.userRole.findMany({
      where: {
        studentId,
      },
      select: {
        role: {
          select: {
            id: true,
            name: true,
            weight: true,
            grants: {
              select: {
                id: true,
                set: true,
                permission: true,
              },
            },
          },
        },
      },
      orderBy: {
        role: {
          weight: 'desc',
        },
      },
    });

    return roles.map((role) => role.role);
  }

  get (userId: string) {
    return this.prisma.student.findUnique({
      where: {
        userId,
      },
      select: {
        firstName: true,
        middleName: true,
        lastName: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            telegramId: true,
            avatar: true,
            state: true,
          },
        },
        group: true,
        roles: {
          select: {
            role: true,
          },
        },
        state: true,
      },
    });
  }

  async getGroupByRole (roleId: string) {
    return this.prisma.group.findFirst({
      where: {
        groupRoles: {
          some: {
            roleId,
          },
        },
      },
      select: {
        id: true,
        code: true,
      },
    });
  }

  async addRole (studentId: string, roleId: string) {
    return this.prisma.userRole.create({
      data: {
        studentId,
        roleId,
      },
    });
  }

  async removeRole (studentId: string, roleId: string) {
    return this.prisma.userRole.deleteMany({
      where: {
        studentId,
        roleId,
      },
    });
  }

  async update (userId: string, data: UpdateStudentData) {
    return this.prisma.student.update({
      where: {
        userId,
      },
      data,
      select: {
        firstName: true,
        middleName: true,
        lastName: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            telegramId: true,
            avatar: true,
            state: true,
          },
        },
        group: true,
        roles: {
          select: {
            role: true,
          },
        },
        state: true,
      },
    });
  }

  async create (data: CreateStudentData) {
    return this.prisma.student.create({
      data,
    });
  }

  async delete (userId: string) {
    await this.prisma.student.delete({
      where: {
        userId,
      },
    });
  }

  getSelective (studentId: string) {
    return this.prisma.discipline.findMany({
      where: {
        selectiveDisciplines: {
          some: {
            studentId,
          },
        },
      },
      select: {
        id: true,
        subject: true,
        group: true,
        semester: true,
        year: true,
      },
    });
  }

  getAnswers (userId: string) {
    return this.prisma.questionAnswer.findMany({
      where: {
        userId,
      },
      select: {
        disciplineTeacherId: true,
      },
    });
  }
}
