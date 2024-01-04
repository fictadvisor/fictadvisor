import { Semester } from '@/types/dates';

export interface GetCurrentSemester extends Semester {
  isFinished: boolean;
}
