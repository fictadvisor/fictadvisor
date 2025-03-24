import { DbDisciplineTeacherRole } from './discipline-teacher-role.entity';
import { DbDiscipline } from './discipline.entity';
import { DisciplineTypeEnum } from '@prisma/client/fictadvisor';
import { DbLesson } from './lesson.entity';

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
