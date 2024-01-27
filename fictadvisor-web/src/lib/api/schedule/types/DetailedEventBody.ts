import { Event, TEvent } from '@/types/schedule';
import { TEventPeriod } from '@/types/schedule';

export interface DetailedEventBody extends Omit<Event, 'eventType'> {
  url?: string;
  eventInfo?: string;
  eventType: TEvent | string;
  disciplineInfo?: string;
  disciplineId: string;
  period: TEventPeriod | string;
  teachers: {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
  }[];
}
