import { ApiProperty } from '@nestjs/swagger';

export class ShortUserResponse {
  @ApiProperty({
    description: 'User\'s id',
  })
    id: string;

  @ApiProperty({
    description: 'User\'s email',
  })
    email: string;
}

export class ShortUsersResponse {
  @ApiProperty({
    description: 'List of users',
    type: [ShortUserResponse],
  })
    users: ShortUserResponse[];
}
