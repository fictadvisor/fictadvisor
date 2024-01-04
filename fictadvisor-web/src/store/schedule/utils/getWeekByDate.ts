import dayjs, { Dayjs } from 'dayjs';

import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';
const WeekMs = 1000 * 60 * 60 * 24 * 7;
export const getWeekByDate = (
  semester: GetCurrentSemester,
  date: Dayjs,
): number => {
  const startTimeMs = dayjs(semester.startDate).tz().valueOf();
  const thisDateMs = date.tz().valueOf();

  const delta = thisDateMs - startTimeMs;
  const decimalWeek = delta / WeekMs;

  return Math.ceil(decimalWeek % 1 === 0 ? decimalWeek + 1 : decimalWeek);
};
