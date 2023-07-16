import { ApiProperty } from '@nestjs/swagger';

export class PaginationDataResponse {
  @ApiProperty()
    pageSize: number;

  @ApiProperty()
    page: number;

  @ApiProperty()
    totalPages: number;

  @ApiProperty()
    prevPageElems: number;
  
  @ApiProperty()
    nextPageElems: number;
}