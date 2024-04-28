import { Injectable, PipeTransform } from '@nestjs/common';
import { QuestionRepository } from '../../database/repositories/QuestionRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';

@Injectable()
export class QuestionByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async transform (questionId: string): Promise<string> {
    const question = await this.questionRepository.findById(questionId);
    if (!question) {
      throw new InvalidEntityIdException('Question');
    }
    return questionId;
  }
}