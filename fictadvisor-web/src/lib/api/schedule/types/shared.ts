import { DetailedEventBody } from '@/lib/api/schedule/types/DetailedEventBody';

export interface SharedEventBody
  extends Omit<DetailedEventBody, 'teachers' | 'id'> {
  teachers: string[];
  disciplineId: string;
}
