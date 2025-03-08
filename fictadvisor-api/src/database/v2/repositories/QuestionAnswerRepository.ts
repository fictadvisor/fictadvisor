import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { DbQuestionAnswer } from '../entities/DbQuestionAnswer';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class QuestionAnswerRepository extends PrismaRepository<'questionAnswer', DbQuestionAnswer> {
  constructor (prisma: PrismaService) {
    super(prisma.questionAnswer, {
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
    });
  }
}
