import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ShortUserResponse } from './UserResponse';
import { PaginationDataResponse } from './PaginationDataResponse';
import { State } from '../enums/db/StateEnum';

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