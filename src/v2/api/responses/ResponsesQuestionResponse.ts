import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

class ResponseQuestion {
  @ApiProperty({
    type: [Question],
  })
    questions: Question[];
}

export class ResponsesQuestionResponse {
  @ApiProperty({
    type: [ResponseQuestion],
  })
    marks: ResponseQuestion[];
}

