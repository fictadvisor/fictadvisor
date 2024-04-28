import { ApiProperty } from '@nestjs/swagger';
import { MappedGroupResponse } from './MappedGroupResponse';
import { PaginationDataResponse } from './PaginationDataResponse';

export class PaginatedGroupsResponse {
  @ApiProperty({
    type: [MappedGroupResponse],
    description: 'List of group\'s data',
  })
    groups: MappedGroupResponse[];

  @ApiProperty({
    type: PaginationDataResponse,
    description: 'Pagination info',
  })
    pagination: PaginationDataResponse;
}