import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateAnswersDTO } from './dto/CreateAnswersDTO';

@Injectable()
export class PollService {
  constructor(
    private prisma: PrismaService,
  ) {}


  async createAnswers(userId: string, disciplineTeacherId: string, body: CreateAnswersDTO) {
    for (const answer of body.answers) {
      this.prisma.questionAnswer.create({
        data: {
          disciplineTeacherId,
          userId,
          ...answer,
        },
      });
    }
  }
}