import { DbDiscipline } from './discipline.entity';
import { DbStudent } from './student.entity';
import { AutoMap } from '@automapper/classes';

export class DbSelectiveDiscipline {
  @AutoMap(() => DbDiscipline)
    discipline?: DbDiscipline;

  @AutoMap()
    disciplineId: string;

  @AutoMap(() => DbStudent)
    student?: DbStudent;

  @AutoMap()
    studentId: string;

  createdAt: Date | null;
  updatedAt: Date | null;
}
