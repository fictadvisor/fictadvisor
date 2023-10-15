import { ApiProperty } from '@nestjs/swagger';

export class MappedGrant {
  @ApiProperty({ description: 'Id of a permission' })
    id: string;

  @ApiProperty({ description: 'Permission accessibility' })
    set: boolean;

  @ApiProperty({ description: 'Type of a permission' })
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