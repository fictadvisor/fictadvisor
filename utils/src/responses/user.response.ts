import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { State } from '../enums';
import { ShortUserResponse } from './short-user.response';
import { PaginationDataResponse } from './pagination-data.response';

export class UserForGetAllResponse extends ShortUserResponse {
  @ApiProperty({
    description: 'User\'s FICE Advisor username',
  })
    username: string;

  @ApiPropertyOptional({
    description: 'User\'s avatar link',
  })
    avatar?: string;

  @ApiProperty({
    description: 'User\'s state',
    enum: State,
    default: State.PENDING,
  })
    state: State;
}

export class UsersResponse {
  @ApiProperty({
    description: 'An array of information about the user',
    type: [UserForGetAllResponse],
  })
    data: UserForGetAllResponse[];

  @ApiProperty({
    description: 'Pagination properties',
  })
    pagination: PaginationDataResponse;
}

export class UserResponse extends UserForGetAllResponse {
  @ApiPropertyOptional({
    description: 'User\'s telegram id',
  })
    telegramId?: number;
}
