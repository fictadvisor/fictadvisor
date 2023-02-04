import { Expose } from 'class-transformer';
import { assign } from 'src/v1/common/common.object';
import { User, UserRole } from 'src/v1/database/entities/user.entity';

export class UserDto {
  id: string;

  @Expose({ name: 'first_name' })
    firstName: string;

  @Expose({ name: 'last_name' })
    lastName?: string;

  @Expose({ name: 'username' })
    username?: string;

  @Expose({ name: 'telegram_id' })
    telegramId: number;

  image?: string;

  role: UserRole;

  @Expose({ name: 'created_at' })
    createdAt: Date;

  @Expose({ name: 'updated_at' })
    updatedAt: Date;

  public static from (u: User) {
    return assign(new UserDto(), {
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      username: u.username,
      telegramId: u.telegramId,
      role: u.role,
      image: u.image ?? '/assets/avatar.png',
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    });
  }
}
