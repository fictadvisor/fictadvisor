import { DbTeachersOnCathedras } from './DbTeachersOnCathedras';
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

  createdAt: Date | null;
  updatedAt: Date | null;

  @AutoMap(() => [DbTeachersOnCathedras])
    teachers?: DbTeachersOnCathedras[];
}
