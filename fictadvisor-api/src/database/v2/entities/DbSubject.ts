import { Discipline } from '@prisma/client/fictadvisor';

export class DbSubject {
  id: string;
  name: string;
  disciplines: Discipline[];
}
