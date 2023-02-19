import { PipeTransform } from '@nestjs/common';
import { TeacherRole } from '@prisma/client';
import { InvalidEntityIdException } from '../../../utils/exceptions/InvalidEntityIdException';
import { QuestionRepository } from '../QuestionRepository';
import { PollService } from '../PollService';

export class QuestionByRoleAndIdPipe implements PipeTransform {
  constructor (
    private questionRepository: QuestionRepository,
    private pollService: PollService,
  ) {}

  async transform (params: {questionId: string, role: TeacherRole}) {
    const { questionId, role } = params;
    const question = await this.pollService.getQuestion(questionId);
    if (!question) {
      throw new InvalidEntityIdException('question');
    }
    const questionRole = await this.questionRepository.getQuestionRole(questionId, role);
    if (!questionRole) {
      throw new InvalidEntityIdException('questionRole');
    }
    return params;
  }
}