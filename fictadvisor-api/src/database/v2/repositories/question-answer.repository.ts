import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client/fictadvisor';
import { DbQuestionAnswer } from '../entities/question-answer.entity';

@Injectable()
export class QuestionAnswerRepository {
  constructor (
    private prisma: PrismaService,
  ) {}
  private include = {
    question: true,
    disciplineTeacher: {
      include: {
        discipline: {
          include: {
            subject: true,
          },
        },
        teacher: true,
      },
    },
  };

  create (data: Prisma.QuestionAnswerUncheckedCreateInput): Promise<DbQuestionAnswer> {
    return this.prisma.questionAnswer.create({
      data,
      include: this.include,
    });
  }

  find (where: Prisma.QuestionAnswerWhereInput): Promise<DbQuestionAnswer> {
    return this.prisma.questionAnswer.findFirst({
      where,
      include: this.include,
    });
  }

  findMany (args: Prisma.QuestionAnswerFindManyArgs): Promise<DbQuestionAnswer[]> {
    return this.prisma.questionAnswer.findMany({
      include: this.include,
      ...args,
    });
  }

  count (args: Prisma.QuestionAnswerCountArgs): Promise<number> {
    return this.prisma.questionAnswer.count({
      ...args,
    });
  }

  update (where: Prisma.QuestionAnswerWhereUniqueInput, data: Prisma.QuestionAnswerUncheckedUpdateInput): Promise<DbQuestionAnswer> {
    return this.prisma.questionAnswer.update({
      where,
      data,
      include: this.include,
    });
  }

  delete (where: Prisma.QuestionAnswerWhereUniqueInput): Promise<DbQuestionAnswer> {
    return this.prisma.questionAnswer.delete({
      where,
      include: this.include,
    });
  }
}
