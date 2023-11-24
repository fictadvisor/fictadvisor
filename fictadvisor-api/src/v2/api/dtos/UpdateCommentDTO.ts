import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class UpdateCommentDTO {
  @ApiProperty({
    description: 'User\'s ID who provided the answer.',
  })
  @IsNotEmpty(validationOptionsMsg('UserId should not be empty'))
    userId: string;

  @ApiProperty({
    description: 'Question id',
  })
  @IsNotEmpty(validationOptionsMsg('QuestionId should not be empty'))
    questionId: string;

  @ApiProperty({
    description: 'New comment value',
  })
  @IsNotEmpty(validationOptionsMsg('Comment should not be empty'))
  @IsString(validationOptionsMsg('Comment must be a string'))
    comment: string;
}