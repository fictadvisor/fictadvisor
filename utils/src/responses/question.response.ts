import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDataResponse } from './pagination-data.response';
import { QuestionDisplay, QuestionType } from '../enums';

export class QuestionResponse {
  @ApiProperty({
    description: 'Id of question',
  })
    id: string;

  @ApiProperty({
    description: 'Order of questions',
  })
    order: number;

  @ApiProperty({
    description: 'Name of question',
  })
    name: string;

  @ApiPropertyOptional({
    description: 'Description of question',
  })
    description?: string;

  @ApiProperty({
    description: 'Text of question',
  })
    text: string;

  @ApiProperty({
    description: 'Show whether question is required',
  })
    isRequired: boolean;

  @ApiPropertyOptional({
    description: 'Criteria of question',
  })
    criteria?: string;

  @ApiProperty({
    enum: QuestionType,
    description: 'An enum of question\'s types',
  })
    type: QuestionType;

  @ApiProperty({
    enum: QuestionDisplay,
    description: 'An enum of question\'s display',
  })
    display: QuestionDisplay;
}

export class QuestionWithCategoryResponse extends QuestionResponse {
  @ApiProperty({
    description: 'Category of question',
  })
    category: string;
}

export class PaginatedQuestionsResponse {
  @ApiProperty({
    type: [QuestionWithCategoryResponse],
    description: 'An array of questions',
  })
    questions: QuestionWithCategoryResponse[];

  @ApiProperty({
    description: 'Pagination data',
  })
    pagination: PaginationDataResponse;
}
