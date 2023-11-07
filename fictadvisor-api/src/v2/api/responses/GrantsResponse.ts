import { ApiProperty } from '@nestjs/swagger';
import { MappedGrant } from './GrantResponse';
import { PaginationDataResponse } from './PaginationDataResponse';

export class GrantsResponse {
    @ApiProperty({
      type: [MappedGrant],
      description: 'An array of mapped grants to the role',
    })
      data: MappedGrant[];

    @ApiProperty({
      description: 'Pagination properties',
    })
      pagination: PaginationDataResponse;
}