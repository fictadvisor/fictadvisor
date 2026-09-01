import { DbBaseUser } from './user.entity';
import { DbBaseGroup, DbGroupWithCathedra } from './group.entity';
import { DbUserRole } from './user-role.entity';
import { DbSelectiveDiscipline } from './selective-discipline.entity';
import { State } from '@prisma-client/fictadvisor';
import { AutoMap } from '@automapper/classes';

export class DbBaseStudent {
  @AutoMap()
    userId: string;

  @AutoMap(() => String)
    firstName: string | null;

  @AutoMap(() => String)
    middleName: string | null;

  @AutoMap(() => String)
    lastName: string | null;

  @AutoMap()
    admissionYear: number;

  @AutoMap(() => String)
    state: State;

  @AutoMap(() => String)
    groupId: string | null;

  createdAt: Date | null;
  updatedAt: Date | null;
}

/** GroupRepository: `students: { roles: { role: true } }` */
export class DbStudentWithRoles extends DbBaseStudent {
  @AutoMap(() => [DbUserRole])
    roles: DbUserRole[];
}

/** UserRepository: `student: { group: true }` */
export class DbStudentWithGroup extends DbBaseStudent {
  @AutoMap(() => DbBaseGroup)
    group: DbBaseGroup | null;
}

/** StudentRepository */
export class DbStudent extends DbStudentWithRoles {
  @AutoMap(() => DbBaseUser)
    user: DbBaseUser;

  @AutoMap(() => DbGroupWithCathedra)
    group: DbGroupWithCathedra | null;

  @AutoMap(() => [DbSelectiveDiscipline])
    selectiveDisciplines: DbSelectiveDiscipline[];
}
