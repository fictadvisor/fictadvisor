import { Injectable } from '@nestjs/common';
import { DbUser } from '../database/entities/DbUser';
import { UserForGetAllResponse, UserResponse } from '@fictadvisor/utils/responses';

@Injectable()
export class UserMapper {
  getUser (user: DbUser): UserResponse {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      telegramId: user.telegramId as unknown as number,
      state: user.state,
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
}
