import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ShortUserResponse {
  @ApiProperty({
    description: 'User\'s id',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'User\'s email',
  })
  @AutoMap()
    email: string;
}

export class ShortUsersResponse {
  @ApiProperty({
    description: 'List of users',
    type: [ShortUserResponse],
  })
    users: ShortUserResponse[];
}
