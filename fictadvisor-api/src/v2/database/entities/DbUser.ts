import { Group, Student } from '@prisma/client';
import { State } from '@fictadvisor/utils/enums';

export class DbUser {
  id: string;
  username: string | null;
  email: string;
  telegramId: bigint | null;
  googleId: string | null;
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
