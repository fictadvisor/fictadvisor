import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDTO {
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Question id can not be empty'))
    questionId: string;
  
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Value can not be empty'))
    value: string;
}

export class CreateAnswersDTO {
  @ApiProperty({
    type: [CreateAnswerDTO],
  })
  @Type(() => CreateAnswerDTO)
  @ValidateNested({ each: true })
    answers: CreateAnswerDTO[];
}