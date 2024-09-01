import { Injectable, PipeTransform } from '@nestjs/common';
import { QuestionRepository } from '../../database/repositories/QuestionRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { DisciplineTypeEnum } from '@fictadvisor/utils';

@Injectable()
export class QuestionByRoleAndIdPipe implements PipeTransform {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async transform (params: { questionId: string, disciplineType: DisciplineTypeEnum }) {
    const { questionId, disciplineType } = params;
    const question = await this.questionRepository.findById(questionId);
    if (!question) {
      throw new InvalidEntityIdException('question');
    }
    if (!question.questionRoles.some((questionRole) => questionRole.role === disciplineType)) {
      throw new InvalidEntityIdException('questionRole');
    }
    return params;
  }
}
