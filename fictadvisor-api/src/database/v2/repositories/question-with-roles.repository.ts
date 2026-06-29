import { Prisma } from '@prisma-client/fictadvisor';
import { PrismaRepository } from '../prisma.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { DbQuestionWithRoles } from '../entities/question-with-roles.entity';

@Injectable()
export class QuestionWithRolesRepository extends PrismaRepository<'question', DbQuestionWithRoles> {
  // The roles relation this repository exists to return; existence-check
  // callers pass no include.
  static readonly responseInclude: Prisma.QuestionInclude = {
    questionRoles: true,
  };

  constructor (prisma: PrismaService) {
    // No global include: callers pass only the relations they need.
    super(prisma.question);
  }
}
