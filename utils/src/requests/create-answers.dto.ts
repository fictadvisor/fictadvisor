import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { validationOptionsMsg } from '../validation.util';

export class CreateAnswerDTO {
  @ApiProperty({
    description: 'Id of answer question',
  })
  @IsString(validationOptionsMsg('Question id must be a string'))
  @IsNotEmpty(validationOptionsMsg('Question id cannot be empty'))
    questionId: string;

  @ApiProperty({
    description: 'Text of answer',
  })
  @IsString(validationOptionsMsg('Value must be a string'))
  @IsNotEmpty(validationOptionsMsg('Value cannot be empty'))
    value: string;
}

export class CreateAnswersDTO {
  @ApiProperty({
    description: 'Array of the question\'s answers',
    type: [CreateAnswerDTO],
  })
  @Type(() => CreateAnswerDTO)
  @ValidateNested({ each: true })
    answers: CreateAnswerDTO[];
}

export class CreateAnswersWithUserIdDTO extends CreateAnswersDTO {
  @ApiProperty({
    description: 'Id of the user who provided answers',
  })
  @IsString(validationOptionsMsg('User id must be a string'))
  @IsNotEmpty(validationOptionsMsg('User id cannot be empty'))
    userId: string;
}
