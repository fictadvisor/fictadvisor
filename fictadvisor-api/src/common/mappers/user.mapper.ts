import { Injectable } from '@nestjs/common';
import { DbUser } from '../../database/v2/entities/user.entity';
import {
  ShortUserResponse,
  ShortUsersResponse,
  UserForGetAllResponse,
  UserResponse,
} from '@fictadvisor/utils/responses';
import { State } from '@fictadvisor/utils';

@Injectable()
export class UserMapper {
  getUser (user: DbUser): UserResponse {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      telegramId: user.telegramId as unknown as number,
      state: user.state as State,
    };
  }

  getAll (users: DbUser[]): UserForGetAllResponse[] {
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      state: user.state,
      avatar: user.avatar,
    } as UserForGetAllResponse));
  }

  getShortUser ({ id, email }: DbUser): ShortUserResponse {
    return { id, email };
  }

  getShortUsers (users: DbUser[]): ShortUsersResponse {
    return {
      users: users.map((user) =>  this.getShortUser(user)),
    };
  }
}
