import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class GrantResponse {
  @ApiProperty({
    description: 'The id of grant',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Established right or not',
    default: true,
  })
  @AutoMap()
    set: boolean;

  @ApiProperty({
    description: 'A string that specifies the permission itself',
  })
  @AutoMap()
    permission: string;

  @ApiProperty({
    description: 'The priority or importance of the grant',
    default: 1,
  })
  @AutoMap()
    weight: number;
}

export class GrantCountResponse {
  @ApiProperty({
    description: 'Number of grants of the role',
  })
  @AutoMap()
    count: number;
}
