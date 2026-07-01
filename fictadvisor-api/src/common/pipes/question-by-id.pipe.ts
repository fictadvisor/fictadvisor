import { Injectable, PipeTransform } from '@nestjs/common';
import { QuestionRepository } from '../../database/v2/repositories/question.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

@Injectable()
export class QuestionByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (private questionRepository: QuestionRepository) {}

  async transform (id: string): Promise<string> {
    const exists = await this.questionRepository.exists({ id });
    if (!exists) {
      throw new InvalidEntityIdException('Question');
    }
    return id;
  }
}
