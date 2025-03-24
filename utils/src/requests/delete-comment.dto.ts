import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

export class DeleteCommentDTO {
  @ApiProperty({
    description: 'User\'s ID who provided the answer.',
  })
  @IsString(validationOptionsMsg('UserId must be a string'))
  @IsNotEmpty(validationOptionsMsg('UserId cannot be empty'))
    userId: string;

  @ApiProperty({
    description: 'Question id',
  })
  @IsString(validationOptionsMsg('Question id must be a string'))
  @IsNotEmpty(validationOptionsMsg('QuestionId cannot be empty'))
    questionId: string;
}
