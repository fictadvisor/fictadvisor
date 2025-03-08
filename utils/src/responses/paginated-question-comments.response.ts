import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDataResponse } from './pagination-data.response';
import { AutoMap } from '@automapper/classes';

export class Comment {
  @ApiProperty({
    description: 'Discipline teacher id',
  })
  @AutoMap()
    disciplineTeacherId: string;

  @ApiProperty({
    description: 'Id of the user who leave the comment',
  })
  @AutoMap()
    userId: string;

  @ApiProperty({
    description: 'Name of the discipline',
  })
  @AutoMap()
    discipline: string;

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
    description: 'Comment (rate or review)',
  })
  @AutoMap()
    comment: string;
}

export class QuestionComment {
  @ApiProperty({
    description: 'Question id',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Question name',
  })
  @AutoMap()
    name: string;

  @ApiPropertyOptional({
    type: [Comment],
    description: 'Array of comments',
  })
  @AutoMap(() => [Comment])
    comments: Comment[];

  @ApiProperty({
    description: 'Pagination parameters',
  })
    pagination: PaginationDataResponse;
}

export class PaginatedQuestionCommentsResponse {
  @ApiProperty({
    type: [QuestionComment],
    description: 'Questions with comments',
  })
    questions: QuestionComment[];
}



