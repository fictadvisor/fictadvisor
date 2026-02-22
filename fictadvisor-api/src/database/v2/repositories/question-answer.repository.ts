import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma-client/fictadvisor';
import { DbQuestionAnswer } from '../entities/question-answer.entity';
import { RepositoryInterface } from '../../interfaces/repository.interface';
import { Include, Sort, Where } from '../prisma.repository';

@Injectable()
export class QuestionAnswerRepository implements RepositoryInterface<DbQuestionAnswer, Prisma.QuestionAnswerWhereInput> {
  constructor (private prisma: PrismaService) {}
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

  findMany (where: Where<'questionAnswer'>,
    include?: Include<'questionAnswer'>,
    page?: { take: number; skip: number },
    sort?: Sort<'questionAnswer'>): Promise<DbQuestionAnswer[]> {
    const methodInclude = {
      ...this.include,
      ...include,
    };

    return this.prisma.questionAnswer.findMany({
      where,
      orderBy: sort,
      take: page?.take,
      skip: page?.skip,
      include: Object.keys(methodInclude).length ? methodInclude : undefined,
    });
  }

  count (where: Where<'questionAnswer'>): Promise<number> {
    return this.prisma.questionAnswer.count({ where });
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
