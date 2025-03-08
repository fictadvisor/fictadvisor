import { DbEvent } from './event.entity';
import { AutoMap } from '@automapper/classes';

export class DbEventInfo {
  @AutoMap(() => DbEvent)
    event?: DbEvent;

  @AutoMap()
    eventId: string;

  @AutoMap()
    number: number;

  @AutoMap()
    description: string | null;

  createdAt: Date | null;
  updatedAt: Date | null;
}
