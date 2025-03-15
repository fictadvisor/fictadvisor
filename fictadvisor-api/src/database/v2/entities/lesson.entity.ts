import { DbDisciplineType } from './discipline-type.entity';
import { DbEvent } from './event.entity';

export class DbLesson {
  event?: DbEvent;
  eventId: string;
  disciplineType?: DbDisciplineType;
  disciplineTypeId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
