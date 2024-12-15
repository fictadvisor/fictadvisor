import { Injectable, PipeTransform } from '@nestjs/common';
import { QuestionRepository } from '../../database/repositories/QuestionRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { DisciplineTypeEnum } from '@fictadvisor/utils';

@Injectable()
export class QuestionByRoleAndIdPipe implements PipeTransform {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async transform (params: { questionId: string, questionRole: DisciplineTypeEnum }) {
    const { questionId, questionRole } = params;
    const question = await this.questionRepository.findById(questionId);
    if (!question) {
      throw new InvalidEntityIdException('Question');
    }
    if (!question.questionRoles.some((role) => role.role === questionRole)) {
      throw new InvalidEntityIdException('QuestionRole');
    }
    return params;
  }
}
