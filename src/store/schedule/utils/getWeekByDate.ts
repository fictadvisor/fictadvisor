import dayjs, { Dayjs } from 'dayjs';

import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';
const WeekMs = 1000 * 60 * 60 * 24 * 7;
export const getWeekByDate = (
  semester: GetCurrentSemester,
  date: Dayjs,
): number => {
  console.log('fromGetWeekByDate', date.date());
  const startTimeMs = dayjs(semester.startDate).tz().valueOf();
  const thisDateMs = date.tz().valueOf();

  const delta = thisDateMs - startTimeMs;
  const decimalWeek = delta / WeekMs;

  console.log(decimalWeek, delta, WeekMs);

  const week = Math.ceil(decimalWeek % 1 === 0 ? decimalWeek + 1 : decimalWeek);
  return week;
};
