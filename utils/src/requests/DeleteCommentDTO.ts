import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

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