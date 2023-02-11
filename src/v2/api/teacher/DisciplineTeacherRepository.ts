import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateDisciplineTeacherData } from './dto/CreateDisciplineTeacherData';
import { TeacherRole } from "@prisma/client";

@Injectable()
export class DisciplineTeacherRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async get(id: string) {
    return this.prisma.disciplineTeacher.findUnique({
      where: {
        id,
      },
      include: {
        teacher: true,
        roles: true,
        questionAnswers: true,
        discipline: true,
      },
    });
  }

  async getDisciplineTeacher(id: string) {
    return this.prisma.disciplineTeacher.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        teacher: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
            avatar: true,
          },
        },
        discipline: {
          select: {
            id: true,
            year: true,
            semester: true,
            isSelective: true,
            group: true,
            subject: true,
            evaluatingSystem: true,
            resource: true,
          },
        },
        roles: {
          select: {
            role: true,
          },
        },
      },
    });
  }

  async getTeacher(id: string) {
    return this.prisma.teacher.findFirst({
      where: {
        disciplineTeachers: {
          some: {
            id,
          },
        },
      },
    });
  }

  async getRoles(id: string) {
    return this.prisma.disciplineTeacherRole.findMany({
      where: {
        disciplineTeacher: {
          id,
        },
      },
    });
  }

  async getAnswers(id: string) {
    return this.prisma.questionAnswer.findMany({
      where: {
        disciplineTeacher: {
          id,
        },
      },
    });
  }

  async getDiscipline(id: string) {
    return this.prisma.discipline.findFirst({
      where: {
        disciplineTeachers: {
          some: {
            id,
          },
        },
      },
      select: {
        id: true,
        subject: true,
        group: true,
        year: true,
        semester: true,
        disciplineTeachers: {
          select: {
            id: true,
            teacher: {
              select: {
                id: true,
                firstName: true,
                middleName: true,
                lastName: true,
                avatar: true,
              },
            },
            roles: {
              select: {
                role: true,
              },
            },
          },
        },
      },
    });
  }

  async create(data: CreateDisciplineTeacherData) {
    return this.prisma.disciplineTeacher.create({
      data,
    });
  }

  async find(data: CreateDisciplineTeacherData) {
    return this.prisma.disciplineTeacher.findFirst({
      where: data,
    });
  }

  async getOrCreate(data: CreateDisciplineTeacherData) {
    let disciplineTeacher = await this.find(data);
    if (!disciplineTeacher){
      disciplineTeacher = await this.create(data);
    }
    return disciplineTeacher;
  }

  async delete(id: string) {
    return this.prisma.disciplineTeacher.delete({
      where: {
        id,
      },
    });
  }

  getQuestions(roles: TeacherRole[], disciplineRoles: TeacherRole[]) {
    return this.prisma.question.findMany({
      where: {
        questionRoles: {
          some: {
            AND: [{
              isShown: true,
              role: {
                in: roles,
              },
            }, {
              isRequired: true,
              role: {
                in: disciplineRoles,
              },
            }],
          },
        },
      },
      select: {
        id: true,
        name: true,
        category: true,
        criteria: true,
        isRequired: true,
        text: true,
        type: true,
        description: true,
      },
    });
  }
}