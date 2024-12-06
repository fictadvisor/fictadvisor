import { ApiProperty } from '@nestjs/swagger';
import { GrantResponse } from './GrantResponse';
import { PaginationDataResponse } from './PaginationDataResponse';

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
