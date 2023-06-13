import { Injectable, PipeTransform } from '@nestjs/common';
import { TeacherRole } from '@prisma/client';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { QuestionRepository } from '../../database/repositories/QuestionRepository';

@Injectable()
export class QuestionByRoleAndIdPipe implements PipeTransform {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async transform (params: {questionId: string, role: TeacherRole}) {
    const { questionId, role } = params;
    const question = await this.questionRepository.findById(questionId);
    if (!question) {
      throw new InvalidEntityIdException('question');
    }
    if (!question.questionRoles.some((r) => r.role === role)) {
      throw new InvalidEntityIdException('questionRole');
    }
    return params;
  }
}