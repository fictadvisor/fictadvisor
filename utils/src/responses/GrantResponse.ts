import { ApiProperty } from '@nestjs/swagger';

export class MappedGrant {
  @ApiProperty({
    description: 'The id of grant',
  })
    id: string;

  @ApiProperty({
    description: 'Established right or not',
    default: true,
  })
    set: boolean;

  @ApiProperty({
    description: 'A string that specifies the permission itself',
  })
    permission: string;

  @ApiProperty({
    description: 'The priority or importance of the grant',
    default: 1,
  })
    weight: number;
}

export class GrantResponse {
  @ApiProperty({
    description: 'Number of grants of the role',
  })
    count: number;
}