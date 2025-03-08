import { DbDisciplineTeacherRole } from './DbDisciplineTeacherRole';
import { DbDiscipline } from './DbDiscipline';
import { DisciplineTypeEnum } from '@prisma/client/fictadvisor';
import { DbLesson } from './DbLesson';

export class DbDisciplineType {
  id: string;
  discipline?: DbDiscipline;
  disciplineId: string;
  name: DisciplineTypeEnum;
  disciplineTeacherRoles?: DbDisciplineTeacherRole[];
  lessons?: DbLesson[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
