import { EventResponse } from '@/lib/api/schedule/types/EventResponse';

export interface SharedEventBody
  extends Omit<EventResponse, 'teachers' | 'id'> {
  teachers: string[];
  disciplineId: string;
}
