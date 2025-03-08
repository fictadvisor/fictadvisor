import { PrismaRepository } from '../prisma.repository';
import { PrismaService } from '../PrismaService';
import { Injectable } from '@nestjs/common';
import { DbQuestionWithRoles } from '../entities/DbQuestionWithRoles';

@Injectable()
export class QuestionWithRolesRepository extends PrismaRepository<'question', DbQuestionWithRoles> {
  constructor (prisma: PrismaService) {
    super(prisma.question, {
      questionRoles: true,
    });
  }
}
