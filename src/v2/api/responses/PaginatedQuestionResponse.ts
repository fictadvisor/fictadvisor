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

class Question {
  @ApiProperty()
    name: string;

  @ApiProperty()
    amount: number;

  @ApiPropertyOptional({
    type: [Comment],
  })
    comments: Comment[];
}

export class PaginatedQuestionResponse {
  @ApiProperty({
    type: [Question],
  })
    questions: Question[];
  
  @ApiProperty()
    pagination: PaginationDataResponse;
}



