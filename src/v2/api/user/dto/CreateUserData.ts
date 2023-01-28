import { State } from "@prisma/client";

export class CreateUserData {
    username?: string;
    email: string;
    password?: string;
    avatar?: string;
    telegramId?: string;
    lastPasswordChanged?: Date;
    state?: State;
}