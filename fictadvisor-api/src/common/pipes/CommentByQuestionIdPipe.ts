import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidTypeException } from '../exceptions/InvalidTypeException';
import { QuestionRepository } from '../../database/v2/repositories/QuestionRepository';
import { QuestionType } from '@prisma/client/fictadvisor';

@Injectable()
export class CommentByQuestionIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}
  async transform (questionId: string): Promise<string> {
    const question = await this.questionRepository.findById(questionId);
    if (question.type !== QuestionType.TEXT) {
      throw new InvalidTypeException('Question');
    }
    return questionId;
  }
}
