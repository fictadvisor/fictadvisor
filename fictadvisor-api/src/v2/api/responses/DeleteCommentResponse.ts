import { ApiProperty } from '@nestjs/swagger';

export class DeleteCommentResponse {
  @ApiProperty({
    description: 'Discipline teacher id',
  })
    disciplineTeacherId: string;

  @ApiProperty({
    description: 'Question id',
  })
    questionId: string;

  @ApiProperty({
    description: 'Id of the user who leave the comment',
  })
    userId: string;

  @ApiProperty({
    description: 'Value of deleted comment',
  })
    value: string;
}