import { ApiProperty } from '@nestjs/swagger';

export class UpdatedCommentResponse {
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
    description: 'Updated comment',
  })
    comment: string;

  @ApiProperty({
    description: 'Semester number',
  })
    semester: number;

  @ApiProperty({
    description: 'Academic year',
  })
    year: number;
}