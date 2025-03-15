import { DbDiscipline } from './DbDiscipline';
import { AutoMap } from '@automapper/classes';

export class DbSubject {
  @AutoMap()
    id: string;

  @AutoMap()
    name: string;

  @AutoMap(() => [DbDiscipline])
    disciplines?: DbDiscipline[];

  createdAt: Date | null;
  updatedAt: Date | null;
}
