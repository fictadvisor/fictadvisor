import { Event } from '@/types/schedule';

export interface GetEventBody {
  startTime: string;
  week: string;
  events: Event[];
}

export interface EventDay {
  week: string;
  day: Date;
  events: (Event | Event[])[];
}
export interface GetEventTransformedBody {
  week: string;
  days: EventDay[];
}
