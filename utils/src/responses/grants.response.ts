import { ApiProperty } from '@nestjs/swagger';
import { GrantResponse } from './grant.response';
import { PaginationDataResponse } from './pagination-data.response';

export class GrantsResponse {
  @ApiProperty({
    type: [GrantResponse],
    description: 'An array of mapped grants to the role',
  })
    grants: GrantResponse[];

  @ApiProperty({
    description: 'Pagination properties',
  })
    pagination: PaginationDataResponse;
}
