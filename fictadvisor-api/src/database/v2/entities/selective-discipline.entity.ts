import { DbBaseDiscipline } from './discipline.entity';
import { AutoMap } from '@automapper/classes';

export class DbBaseSelectiveDiscipline {
  @AutoMap()
    disciplineId: string;

  @AutoMap()
    studentId: string;

  createdAt: Date | null;
  updatedAt: Date | null;
}

/** StudentRepository: `selectiveDisciplines: { discipline: true }` */
export class DbSelectiveDiscipline extends DbBaseSelectiveDiscipline {
  @AutoMap(() => DbBaseDiscipline)
    discipline: DbBaseDiscipline;
}
