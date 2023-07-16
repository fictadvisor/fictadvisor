import { ApiProperty } from '@nestjs/swagger';
import { PaginationDataResponse } from './PaginationDataResponse';

export class GroupResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    code: string;
}

export class GroupsResponse {
  @ApiProperty({
    type: [GroupResponse],
  })
    groups: GroupResponse[];

  @ApiProperty({
    type: PaginationDataResponse,
  })
    pagination: PaginationDataResponse;
}