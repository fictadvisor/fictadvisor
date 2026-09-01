import { DbStudentWithGroup } from './student.entity';
import { State } from '@prisma-client/fictadvisor';
import { AutoMap } from '@automapper/classes';

export class DbBaseUser {
  @AutoMap()
    id: string;

  @AutoMap(() => String)
    username: string | null;

  @AutoMap()
    email: string;

  @AutoMap(() => Number)
    telegramId: bigint | null;

  @AutoMap(() => String)
    avatar: string | null;

  @AutoMap()
    state: State;

  @AutoMap(() => String)
    password: string | null;

  @AutoMap()
    lastPasswordChanged: Date;

  createdAt: Date | null;
  updatedAt: Date | null;
}

/** UserRepository: `student: { group: true }` */
export class DbUser extends DbBaseUser {
  @AutoMap(() => DbStudentWithGroup)
    student: DbStudentWithGroup | null;
}
