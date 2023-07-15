import { ApiProperty } from '@nestjs/swagger';
import { State, RoleName } from '@prisma/client';
import { PaginationDataResponse } from './PaginationDataResponse';

export class GroupResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    code: string;
}

export class ExtendedGroupResponse extends GroupResponse {
  @ApiProperty({
    enum: State,
  })
    state: State;

  @ApiProperty({
    enum: RoleName,
  })
    role: RoleName;
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