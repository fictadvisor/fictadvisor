import { AutoMap } from '@automapper/classes';
import { DbDiscipline } from './DbDiscipline';
import { DbStudent } from './DbStudent';

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
