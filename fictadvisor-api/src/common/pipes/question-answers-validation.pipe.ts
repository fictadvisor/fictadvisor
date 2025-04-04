import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateAnswersDTO, CreateAnswerDTO } from '@fictadvisor/utils/requests';
import { QuestionRepository } from '../../database/v2/repositories/question.repository';
import { InvalidValueException } from '../exceptions/invalid-value.exception';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';
import { QuestionType } from '@prisma/client/fictadvisor';

@Injectable()
export class QuestionAnswersValidationPipe implements PipeTransform {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}
  private validators = {
    [QuestionType.SCALE]: (value: string) => (Number.isInteger(+value) && +value >= 1 && +value <= 10),
    [QuestionType.TOGGLE]: (value: string) => (value === '1' || value === '0'),
    [QuestionType.TEXT]: (value: string) => (value.length >= 4 && value.length <= 4000),
  };

  async validateValue (answer: CreateAnswerDTO) {
    const { questionId, value } = answer;
    const question = await this.questionRepository.findOne({ id: questionId });

    if (!question) {
      throw new InvalidEntityIdException('Question');
    }
    const validate = this.validators[question.type];
    const isValid = validate(value);
    if (!isValid) {
      throw new InvalidValueException();
    }
  }
  async transform (body: CreateAnswersDTO) {
    for (const answer of body.answers) {
      await this.validateValue(answer);
    }
    return body;
  }
}
