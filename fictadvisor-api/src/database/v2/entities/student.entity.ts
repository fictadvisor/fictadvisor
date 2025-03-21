import { DbUser } from './user.entity';
import { DbGroup } from './group.entity';
import { DbUserRole } from './user-role.entity';
import { DbSelectiveDiscipline } from './selective-discipline.entity';
import { DbRemovedDisciplineTeacher } from './removed-discipline-teacher.entity';
import { State } from '@prisma/client/fictadvisor';

export class DbStudent {
  user?: DbUser;
  userId: string;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  admissionYear: number;
  state: State;
  group?: DbGroup;
  groupId: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  roles?: DbUserRole[];
  selectiveDisciplines?: DbSelectiveDiscipline[];
  removedDisciplineTeachers?: DbRemovedDisciplineTeacher[];
}
