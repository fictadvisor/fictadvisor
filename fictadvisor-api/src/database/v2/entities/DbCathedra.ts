import { DbTeachersOnCathedras } from './DbTeachersOnCathedras';
import { DbGroup } from './DbGroup';

export class DbCathedra {
  id: string;
  name: string;
  abbreviation: string;
  division: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  groups?: DbGroup[];
  teachers?: DbTeachersOnCathedras[];
}
