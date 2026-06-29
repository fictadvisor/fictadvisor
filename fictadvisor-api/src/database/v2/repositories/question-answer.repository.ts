import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma-client/fictadvisor';
import { DbQuestionAnswer } from '../entities/question-answer.entity';
import { RepositoryInterface } from '../../interfaces/repository.interface';
import { Include, Sort, Where } from '../prisma.repository';

@Injectable()
export class QuestionAnswerRepository implements RepositoryInterface<DbQuestionAnswer, Prisma.QuestionAnswerWhereInput> {
  constructor (private prisma: PrismaService) {}

  // Relations the answer response mappers read (question + disciplineTeacher
  // → discipline → subject, teacher). Existence/internal callers pass none.
  static readonly responseInclude: Prisma.QuestionAnswerInclude = {
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

  create (data: Prisma.QuestionAnswerUncheckedCreateInput, include?: Prisma.QuestionAnswerInclude): Promise<DbQuestionAnswer> {
    return this.prisma.questionAnswer.create({
      data,
      include,
    });
  }

  find (where: Prisma.QuestionAnswerWhereInput, include?: Prisma.QuestionAnswerInclude): Promise<DbQuestionAnswer> {
    return this.prisma.questionAnswer.findFirst({
      where,
      include,
    });
  }

  findMany (where: Where<'questionAnswer'>,
    include?: Include<'questionAnswer'>,
    page?: { take: number; skip: number },
    sort?: Sort<'questionAnswer'>): Promise<DbQuestionAnswer[]> {
    return this.prisma.questionAnswer.findMany({
      where,
      orderBy: sort,
      take: page?.take,
      skip: page?.skip,
      include,
    });
  }

  count (where: Where<'questionAnswer'>): Promise<number> {
    return this.prisma.questionAnswer.count({ where });
  }

  update (where: Prisma.QuestionAnswerWhereUniqueInput, data: Prisma.QuestionAnswerUncheckedUpdateInput, include?: Prisma.QuestionAnswerInclude): Promise<DbQuestionAnswer> {
    return this.prisma.questionAnswer.update({
      where,
      data,
      include,
    });
  }

  delete (where: Prisma.QuestionAnswerWhereUniqueInput, include?: Prisma.QuestionAnswerInclude): Promise<DbQuestionAnswer> {
    return this.prisma.questionAnswer.delete({
      where,
      include,
    });
  }
}
