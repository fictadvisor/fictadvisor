import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { DbDisciplineTeacherRole } from './DbDisciplineTeacherRole';
import { DbDiscipline } from './DbDiscipline';

export class DbDisciplineType {
  id: string;
  discipline?: DbDiscipline;
  disciplineId: string;
  name: DisciplineTypeEnum;
  disciplineTeacherRoles?: DbDisciplineTeacherRole[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
