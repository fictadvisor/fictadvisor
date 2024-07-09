import { Injectable, PipeTransform } from '@nestjs/common';
import { QuestionRepository } from '../../database/repositories/QuestionRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { TeacherRole } from '@fictadvisor/utils';
import { TeacherTypeAdapter } from '../../mappers/TeacherRoleAdapter';

@Injectable()
export class QuestionByRoleAndIdPipe implements PipeTransform {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async transform (params: { questionId: string, role: TeacherRole }) {
    const { questionId, role } = params;
    const question = await this.questionRepository.findById(questionId);
    if (!question) {
      throw new InvalidEntityIdException('question');
    }
    if (!question.questionRoles.some((r) => r.role === TeacherTypeAdapter[role])) {
      throw new InvalidEntityIdException('questionRole');
    }
    return params;
  }
}
