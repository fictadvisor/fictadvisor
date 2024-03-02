import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDTO {
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Question id cannot be empty'))
    questionId: string;
  
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Value cannot be empty'))
    value: string;
}

export class CreateAnswersDTO {
  @ApiProperty({
    type: [CreateAnswerDTO],
    description: 'Array of the question\'s answers',
  })
  @Type(() => CreateAnswerDTO)
  @ValidateNested({ each: true })
    answers: CreateAnswerDTO[];
}

export class CreateAnswersWithUserIdDTO extends CreateAnswersDTO {
  @ApiProperty({
    description: 'Id of the user who provided answers',
  })
  @IsNotEmpty(validationOptionsMsg('UserId cannot be empty'))
    userId: string;
}
