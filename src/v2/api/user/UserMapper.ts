import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserMapper {
  updateUser (user: User) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      telegramId: user.telegramId,
    };
  }
}