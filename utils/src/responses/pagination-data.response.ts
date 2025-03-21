import { ApiProperty } from '@nestjs/swagger';

export class PaginationDataResponse {
  @ApiProperty({
    description: 'Amount number',
  })
    amount: number;

  @ApiProperty({
    description: 'Total amount number',
  })
    totalAmount: number;

  @ApiProperty({
    description: 'Total pages number',
  })
    totalPages: number;

  @ApiProperty({
    description: 'Page size number',
  })
    pageSize: number;

  @ApiProperty({
    description: 'Current page number',
  })
    page: number;

  @ApiProperty({
    description: 'Previous amount of page elements',
  })
    prevPageElems: number;
  
  @ApiProperty({
    description: 'Next amount of page elements',
  })
    nextPageElems: number;
}