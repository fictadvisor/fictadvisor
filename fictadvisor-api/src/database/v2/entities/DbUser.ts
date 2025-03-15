import { AutoMap } from '@automapper/classes';
import { DbStudent } from './DbStudent';
import { State } from '@prisma/client/fictadvisor';

export class DbUser {
  @AutoMap()
    id: string;

  @AutoMap()
    username: string | null;

  @AutoMap()
    email: string;

  @AutoMap()
    telegramId: bigint | null;

  @AutoMap()
    avatar: string | null;

  @AutoMap()
    state: State;

  @AutoMap()
    password: string | null;

  @AutoMap()
    lastPasswordChanged: Date;

  createdAt: Date | null;
  updatedAt: Date | null;

  @AutoMap(() => DbStudent)
    student?: DbStudent;
}
