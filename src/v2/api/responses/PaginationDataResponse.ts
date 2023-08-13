import { ApiProperty } from '@nestjs/swagger';

export class PaginationDataResponse {
  @ApiProperty()
    amount: number;

  @ApiProperty()
    totalAmount: number;

  @ApiProperty()
    totalPages: number;

  @ApiProperty()
    pageSize: number;

  @ApiProperty()
    page: number;

  @ApiProperty()
    prevPageElems: number;
  
  @ApiProperty()
    nextPageElems: number;
}