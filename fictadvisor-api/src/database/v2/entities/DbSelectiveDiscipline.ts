import { DbDiscipline } from './DbDiscipline';
import { DbStudent } from './DbStudent';

export class DbSelectiveDiscipline {
  discipline?: DbDiscipline;
  disciplineId: string;
  student?: DbStudent;
  studentId: string;
  createdAt: Date | null
  updatedAt: Date | null;
}
