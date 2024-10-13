import { ApiProperty } from '@nestjs/swagger';
import { FAQCategoryResponse } from './FAQCategoryResponse';

export class FAQResponse {
  @ApiProperty({
    description: 'Id of the FAQ item',
  })
    id: string;

  @ApiProperty({
    description: 'The question or statement that this FAQ item addresses',
  })
    text: string;

  @ApiProperty({
    description: 'The answer or response to the given question',
  })
    answer: string;
}

export class FAQWithCategoriesResponse extends FAQResponse {
  @ApiProperty({
    description: 'List of categories associated with this FAQ item',
    type: [FAQCategoryResponse],
  })
    categories: FAQCategoryResponse[];
}

export class FAQsWithCategoriesResponse {
  @ApiProperty({
    description: 'List of FAQs, each associated with its respective categories',
    type: [FAQWithCategoriesResponse],
  })
  faqs: FAQWithCategoriesResponse[];
}

