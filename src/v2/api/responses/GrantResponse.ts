import { ApiProperty } from '@nestjs/swagger';

export class MappedGrant {
  @ApiProperty()
    id: string;

  @ApiProperty()
    set: boolean;

  @ApiProperty()
    permission: string;
}

export class MappedGrantsResponse {
  @ApiProperty({ type: [MappedGrant] })
    grants: MappedGrant[];
}

export class GrantResponse {
  @ApiProperty()
    count: number;
}