import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateDisciplineTeacherData } from './data/CreateDisciplineTeacherData';
import { TeacherRole } from "@prisma/client";
import { CreateDisciplineTeacherWithRolesData } from "./data/CreateDisciplineTeacherWithRolesData";

@Injectable()
export class DisciplineTeacherRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

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

  async createWithRoles({ roles, ...data }: CreateDisciplineTeacherWithRolesData) {
    return this.prisma.disciplineTeacher.create({
      data: {
        ...data,
        roles: {
          create: roles,
        },
      },
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
            isShown: true,
            role: {
              in: roles,
            },
          },
          none: {
            isRequired: true,
            role: {
              notIn: disciplineRoles,
            },
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