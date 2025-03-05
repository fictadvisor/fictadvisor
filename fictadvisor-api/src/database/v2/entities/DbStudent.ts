import { Cathedra, Discipline, EducationalPrograms, Group, SelectiveDiscipline } from '@prisma/client/fictadvisor';
import { State } from '@fictadvisor/utils/enums';
import { DbSpeciality } from './DbSpeciality';
import { DbRole } from './DbRole';
import { DbUser } from './DbUser';

export class DbStudent {
  userId?: string;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  state: State;
  groupId?: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  group?: Group & {
    cathedra?: Cathedra;
    educationalProgram?: {
      speciality: DbSpeciality,
    } & EducationalPrograms,
  };
  roles?: {
    studentId: string,
    roleId: string,
    role: DbRole,
  }[];
  selectiveDisciplines?: (SelectiveDiscipline & {
    discipline: Discipline,
  })[];
  user?: DbUser;
}
