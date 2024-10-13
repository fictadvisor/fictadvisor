import { ApiProperty } from '@nestjs/swagger';
import { FAQResponse } from './FAQResponse';

export class FAQCategoryResponse {
  @ApiProperty({
    description: 'Id of the FAQ category',
  })
    id: string;

  @ApiProperty({
    description: 'Name of the FAQ category',
  })
    name: string;
}

export class FAQCategoryWithFAQsResponse extends FAQCategoryResponse {
  @ApiProperty({
    description: 'List of FAQs belonging to this category',
    type: [FAQResponse],
  })
    faqs: FAQResponse[];
}

export class FAQCategoriesWithFAQsResponse {
  @ApiProperty({
    description: 'List of categories with their respective FAQs',
    type: [FAQCategoryWithFAQsResponse],
  })
    categories: FAQCategoryWithFAQsResponse[];
}
