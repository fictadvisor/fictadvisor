import { DbTeachersOnCathedrasWithTeacher } from './teachers-on-cathedras.entity';
import { AutoMap } from '@automapper/classes';

export class DbBaseCathedra {
  @AutoMap()
    id: string;

  @AutoMap()
    name: string;

  @AutoMap()
    abbreviation: string;

  @AutoMap(() => String)
    division: string | null;

  createdAt: Date | null;
  updatedAt: Date | null;
}

/** CathedraRepository: `teachers: { teacher: true }` */
export class DbCathedra extends DbBaseCathedra {
  @AutoMap(() => [DbTeachersOnCathedrasWithTeacher])
    teachers: DbTeachersOnCathedrasWithTeacher[];
}
