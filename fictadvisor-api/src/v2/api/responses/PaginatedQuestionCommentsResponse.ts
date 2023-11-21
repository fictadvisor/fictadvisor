import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDataResponse } from './PaginationDataResponse';

class Comment {
  @ApiProperty({
    description: 'Discipline teacher id',
  })
    disciplineTeacherId: string;

  @ApiProperty({
    description: 'Id of the user who leave the comment',
  })
    userId: string;

  @ApiProperty({
    description: 'Name of the discipline',
  })
    discipline: string;

  @ApiProperty({
    description: 'Semester number',
  })
    semester: number;

  @ApiProperty({
    description: 'Academic year',
  })
    year: number;

  @ApiProperty({
    description: 'Comment (rate or review)',
  })
    comment: string;
}

class QuestionComment {
  @ApiProperty({
    description: 'Question id',
  })
    id: string;

  @ApiProperty({
    description: 'Question name',
  })
    name: string;
  
  @ApiPropertyOptional({
    type: [Comment],
    description: 'Array of comments',
  })
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



