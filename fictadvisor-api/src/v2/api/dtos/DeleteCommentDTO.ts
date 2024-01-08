import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class DeleteCommentDTO {
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
}