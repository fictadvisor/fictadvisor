import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAnswersDTO {

  @Type(() => CreateAnswerDTO)
  @ValidateNested({ each: true })
    answers: CreateAnswerDTO[];
}

export class CreateAnswerDTO {
  @IsNotEmpty()
    questionId: string;

  @IsNotEmpty()
    value: string;
}