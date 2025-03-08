import { DbUser } from './DbUser';
import { DbGroup } from './DbGroup';
import { DbUserRole } from './DbUserRole';
import { DbSelectiveDiscipline } from './DbSelectiveDiscipline';
import { DbRemovedDisciplineTeacher } from './DbRemovedDisciplineTeacher';
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
