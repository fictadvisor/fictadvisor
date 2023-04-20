import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateQuestionDTO } from './dto/CreateQuestionDTO';
import { UpdateQuestionDTO } from './dto/UpdateQuestionDTO';
import { TeacherRole } from '@prisma/client';
import { QuestionType } from '@prisma/client';
import { MarksData } from '../teacher/data/MarksData';
import { CreateQuestionWithRolesData } from './data/CreateQuestionWithRolesData';
import { CreateQuestionRoleData } from './data/CreateQuestionRoleData';

@Injectable()
export class QuestionRepository {
  constructor (
    private prisma: PrismaService,
  ) {
  }

  async create (data: CreateQuestionDTO) {
    return this.prisma.question.create({
      data,
    });
  }

  async connectRole (questionId: string, data: CreateQuestionRoleData) {
    return this.prisma.questionRole.create({
      data: {
        questionId,
        ...data,
      },
    });
  }

  async deleteRole (questionId: string, role: TeacherRole) {
    return this.prisma.questionRole.deleteMany({
      where: {
        questionId,
        role,
      },
    });
  }

  async delete (id: string) {
    return this.prisma.question.delete({
      where: {
        id,
      },
    });
  }

  async update (id: string, data: UpdateQuestionDTO) {
    return this.prisma.question.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        category: true,
        name: true,
        order: true,
        description: true,
        text: true,
        criteria: true,
      },
    });
  }

  async getQuestion (id: string) {
    return this.prisma.question.findUnique({
      where: {
        id,
      },
    });
  }

  async getQuestionRole (questionId: string, role: TeacherRole) {
    return this.prisma.questionRole.findFirst({
      where: {
        questionId,
        role,
      },
    });
  }

  createWithRoles ({ roles, ...data }: CreateQuestionWithRolesData) {
    return this.prisma.question.create({
      data: {
        ...data,
        questionRoles: {
          create: roles,
        },
      },
      include: {
        questionRoles: {
          select: {
            role: true,
            isRequired: true,
            isShown: true,
          },
        },
      },
    });
  }

  async getMarks (teacherId: string, data?: MarksData) {
    return this.prisma.question.findMany({
      where: {
        OR: [{
          type: QuestionType.TOGGLE,
        }, {
          type: QuestionType.SCALE,
        }],
      },
      select: {
        id: true,
        category: true,
        name: true,
        text: true,
        type: true,
        display: true,
        questionAnswers: {
          where: {
            disciplineTeacher: {
              teacherId,
              discipline: {
                ...data,
              },
            },
          },
          select: {
            value: true,
          },
        },
      },
    });
  }
}
