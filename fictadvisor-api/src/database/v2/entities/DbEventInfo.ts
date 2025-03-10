import { DbEvent } from './DbEvent';

export class DbEventInfo {
  event?: DbEvent;
  eventId: string;
  number: number;
  description: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
