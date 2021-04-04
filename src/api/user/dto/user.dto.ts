import { Expose } from "class-transformer";
import { assign } from "src/common/common.object";
import { User, UserRole } from "src/database/entities/user.entity";

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

    role: UserRole;

    @Expose({ name: 'created_at' })
    createdAt: Date;

    @Expose({ name: 'updated_at' })
    updatedAt: Date;

    public static from(u: User) {
        return assign(
            new UserDto(),
            {
                id: u.id,
                firstName: u.firstName,
                lastName: u.lastName,
                username: u.username,
                telegramId: u.telegramId,
                role: u.role,
                createdAt: u.createdAt,
                updatedAt: u.updatedAt,
            }
        );
    }
};
