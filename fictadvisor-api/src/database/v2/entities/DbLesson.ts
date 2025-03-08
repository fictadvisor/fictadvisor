import { DbDisciplineType } from './DbDisciplineType';
import { DbEvent } from './DbEvent';

export class DbLesson {
  event?: DbEvent;
  eventId: string;
  disciplineType?: DbDisciplineType;
  disciplineTypeId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
