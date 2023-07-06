import { ApiProperty } from '@nestjs/swagger';
import { MetaDataResponse } from './MetaDataResponse';

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
    type: MetaDataResponse,
  })
    meta: MetaDataResponse;
}