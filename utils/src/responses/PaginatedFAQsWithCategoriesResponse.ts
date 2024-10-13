import { ApiProperty } from '@nestjs/swagger';
import { FAQWithCategoriesResponse } from './FAQResponse';
import { PaginationDataResponse } from './PaginationDataResponse';

export class PaginatedFAQsWithCategoriesResponse {
  @ApiProperty({
    type: [FAQWithCategoriesResponse],
    description: 'List of FAQ\'s data',
  })
  faqs: FAQWithCategoriesResponse[];

  @ApiProperty({
    type: PaginationDataResponse,
    description: 'Pagination info',
  })
  pagination: PaginationDataResponse;
}