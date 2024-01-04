import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { CreateAnswerData } from '../../api/datas/CreateAnswerData';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestionAnswerRepository {
  constructor (
    private prisma: PrismaService,
  ) {}
  private include = {
    question: true,
    disciplineTeacher: {
      include: {
        discipline: true,
        teacher: true,
      },
    },
  };

  create (data: CreateAnswerData) {
    return this.prisma.questionAnswer.create({
      data,
      include: this.include,
    });
  }

  find (where: Prisma.QuestionAnswerWhereInput) {
    return this.prisma.questionAnswer.findFirst({
      where,
      include: this.include,
    });
  }

  findMany (args: Prisma.QuestionAnswerFindManyArgs) {
    return this.prisma.questionAnswer.findMany({
      include: this.include,
      ...args,
    });
  }

  count (args: Prisma.QuestionAnswerCountArgs) {
    return this.prisma.questionAnswer.count({
      ...args,
    });
  }
}