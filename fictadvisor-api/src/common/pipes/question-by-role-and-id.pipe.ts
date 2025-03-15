import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';
import { DisciplineTypeEnum } from '@fictadvisor/utils';
import { QuestionWithRolesRepository } from '../../database/v2/repositories/question-with-roles.repository';

@Injectable()
export class QuestionByRoleAndIdPipe implements PipeTransform {
  constructor (private questionWithRolesRepository: QuestionWithRolesRepository) {}

  async transform (params: { questionId: string, questionRole: DisciplineTypeEnum }) {
    const { questionId, questionRole } = params;
    const question = await this.questionWithRolesRepository.findOne({ id: questionId });
    if (!question) {
      throw new InvalidEntityIdException('Question');
    }
    if (!question.questionRoles.some((role) => role.role === questionRole)) {
      throw new InvalidEntityIdException('QuestionRole');
    }
    return params;
  }
}
