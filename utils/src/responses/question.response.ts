import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDataResponse } from './pagination-data.response';
import { QuestionDisplay, QuestionType } from '../enums';
import { AutoMap } from '@automapper/classes';

export class QuestionResponse {
  @ApiProperty({
    description: 'Id of question',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Order of questions',
  })
  @AutoMap()
    order: number;

  @ApiProperty({
    description: 'Name of question',
  })
  @AutoMap()
    name: string;

  @ApiPropertyOptional({
    description: 'Description of question',
  })
  @AutoMap()
    description?: string;

  @ApiProperty({
    description: 'Text of question',
  })
  @AutoMap()
    text: string;

  @ApiProperty({
    description: 'Show whether question is required',
  })
  @AutoMap()
    isRequired: boolean;

  @ApiPropertyOptional({
    description: 'Criteria of question',
  })
  @AutoMap()
    criteria?: string;

  @ApiProperty({
    enum: QuestionType,
    description: 'An enum of question\'s types',
  })
  @AutoMap(() => String)
    type: QuestionType;

  @ApiProperty({
    enum: QuestionDisplay,
    description: 'An enum of question\'s display',
  })
  @AutoMap(() => String)
    display: QuestionDisplay;
}

export class QuestionWithCategoryResponse extends QuestionResponse {
  @ApiProperty({
    description: 'Category of question',
  })
  @AutoMap()
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
