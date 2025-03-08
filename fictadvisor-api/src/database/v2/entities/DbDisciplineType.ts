import { DbDisciplineTeacherRole } from './DbDisciplineTeacherRole';
import { DbDiscipline } from './DbDiscipline';
import { DisciplineTypeEnum } from '@prisma/client/fictadvisor';

export class DbDisciplineType {
  id: string;
  discipline?: DbDiscipline;
  disciplineId: string;
  name: DisciplineTypeEnum;
  disciplineTeacherRoles?: DbDisciplineTeacherRole[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
