import { DbTeachersOnCathedras } from './teachers-on-cathedras.entity';
import { DbGroup } from './group.entity';
import { AutoMap } from '@automapper/classes';

export class DbCathedra {
  @AutoMap()
    id: string;

  @AutoMap()
    name: string;

  @AutoMap()
    abbreviation: string;

  @AutoMap()
    division: string | null;

  @AutoMap(() => [DbGroup])
    groups?: DbGroup[];

  @AutoMap(() => [DbTeachersOnCathedras])
    teachers?: DbTeachersOnCathedras[];

  createdAt: Date | null;
  updatedAt: Date | null;
}
