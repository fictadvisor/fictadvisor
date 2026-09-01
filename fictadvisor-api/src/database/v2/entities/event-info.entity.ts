import { AutoMap } from '@automapper/classes';

export class DbEventInfo {
  @AutoMap()
    eventId: string;

  @AutoMap()
    number: number;

  @AutoMap(() => String)
    description: string | null;

  createdAt: Date | null;
  updatedAt: Date | null;
}
