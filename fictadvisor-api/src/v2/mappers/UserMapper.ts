import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DbUser } from '../database/entities/DbUser';

@Injectable()
export class UserMapper {
  getUser (user: User) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      telegramId: user.telegramId,
      state: user.state,
    };
  }

  getAll (users: DbUser[]) {
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      state: user.state,
    }));
  }
}