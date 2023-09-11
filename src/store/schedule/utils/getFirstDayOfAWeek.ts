import dayjs, { Dayjs } from 'dayjs';
const DayMs = 1000 * 60 * 60 * 24;
const WeekMs = DayMs * 7;

import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';

export const getFirstDayOfAWeek = (
  semester: GetCurrentSemester,
  week: number,
): Dayjs => {
  const startDateMs = dayjs(semester.startDate).tz().valueOf();
  return dayjs(startDateMs + WeekMs * week - DayMs * 7).tz();
};
