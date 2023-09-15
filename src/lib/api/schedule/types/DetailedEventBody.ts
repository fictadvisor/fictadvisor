import { Event, TDiscipline } from '@/types/schedule';
import { TEventPeriod } from '@/types/schedule';

export interface DetailedEventBody extends Omit<Event, 'disciplineType'> {
  url?: string;
  eventInfo?: string;
  disciplineType: TDiscipline | string;
  disciplineInfo?: string;
  period: TEventPeriod | string;
  teachers: {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
  }[];
}
