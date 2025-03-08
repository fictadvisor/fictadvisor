import { ApiProperty } from '@nestjs/swagger';
import { ShortTeacherResponse } from './teacher.response';
import { SubjectResponse } from './subject.response';
import { AutoMap } from '@automapper/classes';

export class CommentResponse {
  @ApiProperty({
    description: 'Discipline teacher id',
  })
  @AutoMap()
    disciplineTeacherId: string;

  @ApiProperty({
    description: 'Question id',
  })
  @AutoMap()
    questionId: string;

  @ApiProperty({
    description: 'Id of the user who leave the comment',
  })
  @AutoMap()
    userId: string;

  @ApiProperty({
    description: 'Comment',
  })
  @AutoMap()
    comment: string;

  @ApiProperty({
    description: 'Semester number',
  })
  @AutoMap()
    semester: number;

  @ApiProperty({
    description: 'Academic year',
  })
  @AutoMap()
    year: number;

  @ApiProperty({
    description: 'The teacher to whom the comment was written',
  })
  @AutoMap(() => ShortTeacherResponse)
    teacher: ShortTeacherResponse;

  @ApiProperty({
    description: 'The subject on which the comment is written',
  })
  @AutoMap(() => SubjectResponse)
    subject: SubjectResponse;
}
