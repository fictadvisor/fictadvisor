import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { DbQuestion } from '../entities/DbQuestion';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class QuestionRepository extends PrismaRepository<'question', DbQuestion> {
  constructor (prisma: PrismaService) {
    super(prisma.question);
  }
}


