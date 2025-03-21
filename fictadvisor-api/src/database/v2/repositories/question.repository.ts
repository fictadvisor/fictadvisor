import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbQuestion } from '../entities/question.entity';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class QuestionRepository extends PrismaRepository<'question', DbQuestion> {
  constructor (prisma: PrismaService) {
    super(prisma.question);
  }
}


