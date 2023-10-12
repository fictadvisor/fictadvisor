import { ApiProperty } from '@nestjs/swagger';

export class MappedGrant {
  @ApiProperty({
    description: 'The id of grant',
  })
    id: string;

  @ApiProperty({
    description: 'Established right or not',
  })
    set: boolean;

  @ApiProperty({
    description: 'A string that specifies the permission itself',
  })
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