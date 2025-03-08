import { DbUser } from './user.entity';
import { DbGroup } from './group.entity';
import { DbUserRole } from './user-role.entity';
import { DbSelectiveDiscipline } from './selective-discipline.entity';
import { DbRemovedDisciplineTeacher } from './removed-discipline-teacher.entity';
import { State } from '@prisma/client/fictadvisor';
import { AutoMap } from '@automapper/classes';

export class DbStudent {
  @AutoMap(() => DbUser)
    user?: DbUser;

  @AutoMap()
    userId: string;

  @AutoMap()
    firstName: string | null;

  @AutoMap()
    middleName: string | null;

  @AutoMap()
    lastName: string | null;

  @AutoMap()
    admissionYear: number;

  @AutoMap(() => String)
    state: State;

  @AutoMap(() => DbGroup)
    group?: DbGroup;

  @AutoMap()
    groupId: string | null;

  @AutoMap(() => [DbUserRole])
    roles?: DbUserRole[];

  @AutoMap(() => [DbSelectiveDiscipline])
    selectiveDisciplines?: DbSelectiveDiscipline[];

  @AutoMap(() => [DbRemovedDisciplineTeacher])
    removedDisciplineTeachers?: DbRemovedDisciplineTeacher[];

  createdAt: Date | null;
  updatedAt: Date | null;
}
