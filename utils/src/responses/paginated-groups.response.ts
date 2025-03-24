import { ApiProperty } from '@nestjs/swagger';
import { MappedGroupResponse } from './mapped-group.response';
import { PaginationDataResponse } from './pagination-data.response';

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
