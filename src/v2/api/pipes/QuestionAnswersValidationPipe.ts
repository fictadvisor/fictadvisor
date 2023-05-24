import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateAnswersDTO, CreateAnswerDTO } from '../dtos/CreateAnswersDTO';
import { QuestionRepository } from '../../database/repositories/QuestionRepository';
import { QuestionType } from '@prisma/client';
import { InvalidValueException } from '../../utils/exceptions/InvalidValueException';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';

@Injectable()
export class QuestionAnswersValidationPipe implements PipeTransform {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}
  private validators = {
    [QuestionType.SCALE]: (value: string) => (Number.isInteger(+value) && +value >= 1 && +value <= 10),
    [QuestionType.TOGGLE]: (value: string) => (value === '1' || value === '0'),
    [QuestionType.TEXT]: (value: string) => (value.length >= 4 && value.length <= 2000),
  };

  async validateValue (answer: CreateAnswerDTO) {
    const { questionId, value } = answer;
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new InvalidEntityIdException('question');
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