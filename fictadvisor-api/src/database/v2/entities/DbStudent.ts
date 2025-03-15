import { DbUser } from './DbUser';
import { DbGroup } from './DbGroup';
import { DbUserRole } from './DbUserRole';
import { DbSelectiveDiscipline } from './DbSelectiveDiscipline';
import { DbRemovedDisciplineTeacher } from './DbRemovedDisciplineTeacher';
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
    admissionYear: number | null;

  @AutoMap(() => String)
    state: State;

  @AutoMap(() => DbGroup)
    group?: DbGroup;

  @AutoMap()
    groupId?: string;

  createdAt: Date | null;
  updatedAt: Date | null;

  @AutoMap(() => [DbUserRole])
    roles?: DbUserRole[];

  @AutoMap(() => [DbSelectiveDiscipline])
    selectiveDisciplines?: DbSelectiveDiscipline[];

  @AutoMap(() => [DbRemovedDisciplineTeacher])
    removedDisciplineTeachers?: DbRemovedDisciplineTeacher[];
}
