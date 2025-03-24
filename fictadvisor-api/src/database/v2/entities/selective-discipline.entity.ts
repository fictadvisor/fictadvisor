import { DbDiscipline } from './discipline.entity';
import { DbStudent } from './student.entity';

export class DbSelectiveDiscipline {
  discipline?: DbDiscipline;
  disciplineId: string;
  student?: DbStudent;
  studentId: string;
  createdAt: Date | null
  updatedAt: Date | null;
}
