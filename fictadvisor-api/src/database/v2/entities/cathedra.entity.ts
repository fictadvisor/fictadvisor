import { DbTeachersOnCathedras } from './teachers-on-cathedras.entity';
import { DbGroup } from './group.entity';

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
