import dayjs, { Dayjs } from 'dayjs';
const HourMs = 1000 * 60 * 60;
const DayMs = HourMs * 24;
const WeekMs = DayMs * 7;

import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';

export const getFirstDayOfAWeek = (
  semester: GetCurrentSemester,
  week: number,
): Dayjs => {
  const startDateMs = dayjs(semester.startDate).tz().valueOf();
  return dayjs(startDateMs + WeekMs * week - DayMs * 7 + HourMs).tz();
};
