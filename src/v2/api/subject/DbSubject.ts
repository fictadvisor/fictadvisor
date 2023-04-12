import { Discipline } from '@prisma/client';

export class DbSubject {
  id: string;
  name: string;
  disciplines: Discipline[];
}