import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class CreateAnswersDTO {

  @Type(() => CreateAnswerDTO)
  @ValidateNested({ each: true })
    answers: CreateAnswerDTO[];
}

export class CreateAnswerDTO {
  @IsNotEmpty(validationOptionsMsg('Question id can not be empty'))
    questionId: string;

  @IsNotEmpty(validationOptionsMsg('Value can not be empty'))
    value: string;
}