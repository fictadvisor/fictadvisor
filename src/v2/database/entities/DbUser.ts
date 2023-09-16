import { Group, State, Student } from '@prisma/client';

export class DbUser {
  id: string;
  username: string | null;
  email: string;
  telegramId: bigint | null;
  avatar: string | null;
  state: State;
  password: string | null;
  lastPasswordChanged: Date;
  createdAt: Date | null;
  updatedAt: Date | null;
  student: Student & {
    group: Group
  };
}