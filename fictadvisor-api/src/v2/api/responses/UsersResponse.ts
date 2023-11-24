import { ShortUserResponse } from './UserResponse';
import { ApiProperty } from '@nestjs/swagger';
import { State } from '@prisma/client';
import { PaginationDataResponse } from './PaginationDataResponse';

export class UserForGetAllResponse extends ShortUserResponse {
    @ApiProperty({
      description: 'User\'s fictAdvisor username',
    })
      username: string;

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