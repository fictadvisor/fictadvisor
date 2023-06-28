import { ApiProperty } from '@nestjs/swagger';

export class MetaDataResponse {
  @ApiProperty()
    pageSize: number;

  @ApiProperty()
    page: number;

  @ApiProperty()
    prevPageElems: number;
    
  @ApiProperty()
    nextPageElems: number;
}