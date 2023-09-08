import dayjs, { Dayjs } from 'dayjs';
const DayMs = 1000 * 60 * 60 * 24;
const WeekMs = DayMs * 7;

import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';

export const getLastDayOfAWeek = (
  semester: GetCurrentSemester,
  week: number,
): Dayjs => {
  const startDateMs = dayjs(semester.startDate).tz().valueOf();

  const lastDayOfWeek = dayjs(startDateMs + WeekMs * week - DayMs).tz();

  return lastDayOfWeek;
};
