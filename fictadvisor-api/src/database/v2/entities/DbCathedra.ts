import { DbTeachersOnCathedras } from './DbTeachersOnCathedras';

export class DbCathedra {
  id: string;
  name: string;
  abbreviation: string;
  division: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  teachers?: DbTeachersOnCathedras[];
}
