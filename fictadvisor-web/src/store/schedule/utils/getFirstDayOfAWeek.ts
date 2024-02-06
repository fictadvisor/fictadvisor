const HourMs = 1000 * 60 * 60;
const DayMs = HourMs * 24;
const WeekMs = DayMs * 7;

import moment, { Moment } from 'moment';

import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';

export const getFirstDayOfAWeek = (
  semester: GetCurrentSemester,
  week: number,
): Moment => {
  const startDateMs = moment(semester.startDate).valueOf();
  return moment(startDateMs + WeekMs * week - DayMs * 7 + HourMs);
};
