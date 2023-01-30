import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateQuestionData } from "./dto/CreateQuestionDTO";
import { UpdateQuestionDTO } from "./dto/UpdateQuestionDTO";
import { QuestionRoleData } from "./dto/QuestionRoleData";
import { TeacherRole } from "@prisma/client";

@Injectable()
export class QuestionRepository {
  constructor(
    private prisma: PrismaService,
  ) {
  }

  async create(data: CreateQuestionData) {
    return this.prisma.question.create({
      data,
    });
  }

  async connectRole(questionId: string, data: QuestionRoleData) {
    return await this.prisma.questionRole.create({
      data: {
        questionId,
        ...data,
      },
    });
  }

  async deleteRole(questionId: string, role: TeacherRole) {
    return this.prisma.questionRole.deleteMany({
      where: {
        questionId,
        role,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.question.delete({
      where: {
        id,
      },
    },);
  }

  async update(id: string, data: UpdateQuestionDTO) {
    return this.prisma.question.update({
      where: {
        id,
      },
      data,
    });
  }

  async getQuestion(id: string) {
    return await this.prisma.question.findUnique({
      where: {
        id,
      },
    });
  }

  async getQuestionsByRole(role: TeacherRole) {
    return this.prisma.questionRole.findMany({
      where: {
        role,
      },
      select: {
        question: true,
      },
    });
  }




}

