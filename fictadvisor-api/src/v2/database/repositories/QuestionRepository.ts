import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';
import { DbQuestionWithRoles } from '../entities/DbQuestionWithRoles';

@Injectable()
export class QuestionRepository {
  constructor (
    private prisma: PrismaService,
  ) {
  }
  private include = {
    questionRoles: true,
  };

  async findMany (data: Prisma.QuestionFindManyArgs) {
    return this.prisma.question.findMany({
      include: this.include,
      ...data,
    }) as any as DbQuestionWithRoles[];
  }

  async findById (id: string) {
    return this.prisma.question.findUnique({
      where: {
        id,
      },
      include: this.include,
    }) as any as DbQuestionWithRoles;
  }

  async create (data: Prisma.QuestionUncheckedCreateInput) {
    return this.prisma.question.create({
      data,
      include: this.include,
    }) as any as DbQuestionWithRoles;
  }

  async deleteById (id: string) {
    return this.prisma.question.delete({
      where: {
        id,
      },
      include: this.include,
    }) as any as DbQuestionWithRoles;
  }

  async updateById (id: string, data: Prisma.QuestionUncheckedUpdateInput) {
    return this.prisma.question.update({
      where: {
        id,
      },
      data,
      include: this.include,
    }) as any as DbQuestionWithRoles;
  }

  async count (data: Prisma.QuestionCountArgs) {
    return this.prisma.question.count(
      data,
    );
  }
}


