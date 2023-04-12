import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateAnswerData } from './data/CreateAnswerData';

@Injectable()
export class QuestionAnswerRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  create (data: CreateAnswerData) {
    return this.prisma.questionAnswer.create({
      data,
    });
  }

  find (where: Omit<CreateAnswerData, 'value'>) {
    return this.prisma.questionAnswer.findFirst({
      where,
      select: {
        question: {
          select: {
            id: true,
            category: true,
            name: true,
            order: true,
            description: true,
            text: true,
            isRequired: true,
            type: true,
            display: true,
          },
        },
        disciplineTeacher: {
          select: {
            id: true,
            discipline: {
              select: {
                id: true,
                subject: true,
                group: true,
                semester: true,
                year: true,
                isSelective: true,
              },
            },
            teacher: {
              select: {
                id: true,
                firstName: true,
                middleName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  findMany (disciplineTeacherId: string, userId: string) {
    return this.prisma.questionAnswer.findMany({
      where: {
        disciplineTeacherId,
        userId,
      },
    });
  }
}