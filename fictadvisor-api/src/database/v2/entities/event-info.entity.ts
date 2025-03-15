import { DbEvent } from './event.entity';

export class DbEventInfo {
  event?: DbEvent;
  eventId: string;
  number: number;
  description: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
