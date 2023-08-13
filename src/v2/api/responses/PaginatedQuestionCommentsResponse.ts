import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDataResponse } from './PaginationDataResponse';

class Comment {
  @ApiProperty()
    discipline: string;

  @ApiProperty()
    semester: number;

  @ApiProperty()
    year: string;

  @ApiProperty()
    comment: string;
}

class QuestionComment {
  @ApiProperty()
    id: string;

  @ApiProperty()
    name: string;
  
  @ApiPropertyOptional({
    type: [Comment],
  })
    comments: Comment[];
  
  @ApiProperty()
    pagination: PaginationDataResponse;
}

export class PaginatedQuestionCommentsResponse {
  @ApiProperty({
    type: [QuestionComment],
  })
    questions: QuestionComment[];
}



