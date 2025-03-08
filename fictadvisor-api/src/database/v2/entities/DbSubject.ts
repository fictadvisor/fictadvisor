import { DbDiscipline } from './DbDiscipline';

export class DbSubject {
  id: string;
  name: string;
  disciplines?: DbDiscipline[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
