import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DbUser } from '../database/entities/DbUser';
import { UserForGetAllResponse } from '@fictadvisor/utils/responses';

@Injectable()
export class UserMapper {
  getUser (user: User) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      telegramId: user.telegramId,
      googleId: user.googleId,
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
