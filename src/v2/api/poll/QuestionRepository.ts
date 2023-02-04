import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateQuestionData } from './dto/CreateQuestionDTO';
import { UpdateQuestionDTO } from './dto/UpdateQuestionDTO';
import { CreateQuestionRoleData } from './dto/CreateQuestionRoleData';
import { TeacherRole } from '@prisma/client';

@Injectable()
export class QuestionRepository {
  constructor (
    private prisma: PrismaService,
  ) {
  }

  async create (data: CreateQuestionData) {
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
    },);
  }

  async update (id: string, data: UpdateQuestionDTO) {
    return this.prisma.question.update({
      where: {
        id,
      },
      data,
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
  async getQuestionsByRole (role: TeacherRole) {
    const roles = await this.prisma.questionRole.findMany({
      where: {
        role,
      },
      select: {
        question: true,
      },
    });

    return roles.map((r) => r.question);
  }




}

