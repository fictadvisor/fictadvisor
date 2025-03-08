import { DbDisciplineType } from './discipline-type.entity';
import { DbEvent } from './event.entity';
import { AutoMap } from '@automapper/classes';

export class DbLesson {
  @AutoMap(() => DbEvent)
    event?: DbEvent;

  @AutoMap()
    eventId: string;

  @AutoMap(() => DbDisciplineType)
    disciplineType?: DbDisciplineType;

  @AutoMap()
    disciplineTypeId: string;

  createdAt: Date | null;
  updatedAt: Date | null;
}
