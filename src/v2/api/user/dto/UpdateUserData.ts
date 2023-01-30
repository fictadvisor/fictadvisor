import { State } from "@prisma/client";

export class UpdateUserData {
  email?: string;
  username?: string;
  avatar?: string;
  password?: string;
  telegramId?: number;
  lastPasswordChanged?: Date;
  state?: State;
}