import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExtendedGroupResponse } from './GroupResponse';
import { State } from '../enums/db/StateEnum';

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

export class UserResponse extends ShortUserResponse {
  @ApiProperty({
    description: 'User\'s telegram username',
  })
    username: string;

  @ApiPropertyOptional({
    description: 'User\'s telegram id',
  })
    telegramId?: number;

  @ApiPropertyOptional({
    description: 'User\'s google account id',
  })
    googleId?: string;

  @ApiPropertyOptional({
    description: 'User\'s avatar link',
  })
    avatar?: string;

  @ApiProperty({
    description: 'User\'s state',
    enum: State,
  })
    state: State;
}

export class FullUserResponse extends UserResponse {
  @ApiProperty({
    description: 'User\'s first name',
  })
    firstName: string;
  
  @ApiProperty({
    description: 'User\'s last name',
  })
    lastName: string;
  
  @ApiProperty({
    description: 'User\'s middle name',
  })
    middleName: string;

  @ApiProperty({
    description: 'User\'s group info',
    type: ExtendedGroupResponse,
  })
    group: ExtendedGroupResponse;
}

export class ShortUsersResponse {
  @ApiProperty({
    description: 'List of users',
    type: [ShortUserResponse],
  })
    users: ShortUserResponse[];
}
