import { PrismaRepository } from '../prisma.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { DbQuestionWithRoles } from '../entities/question-with-roles.entity';

@Injectable()
export class QuestionWithRolesRepository extends PrismaRepository<'question', DbQuestionWithRoles> {
  constructor (prisma: PrismaService) {
    super(prisma.question, {
      questionRoles: true,
    });
  }
}
