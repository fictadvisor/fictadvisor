import { DbDiscipline } from './discipline.entity';

export class DbSubject {
  id: string;
  name: string;
  disciplines?: DbDiscipline[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
