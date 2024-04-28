import { Event } from '@/types/schedule';

export interface EventDay {
  week: number;
  day: Date;
  events: (Event | Event[])[];
}
export interface GetEventTransformedBody {
  week: number;
  days: EventDay[];
}
