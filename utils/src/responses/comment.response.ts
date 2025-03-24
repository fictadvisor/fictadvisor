import { ApiProperty } from '@nestjs/swagger';
import { ShortTeacherResponse } from './teacher.response';
import { SubjectResponse } from './subject.response';

export class CommentResponse {
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
    description: 'Comment',
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

  @ApiProperty({
    description: 'The teacher to whom the comment was written',
  })
    teacher: ShortTeacherResponse;

  @ApiProperty({
    description: 'The subject on which the comment is written',
  })
    subject: SubjectResponse;
}
