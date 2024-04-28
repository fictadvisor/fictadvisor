import { CurrentSemester } from '@fictadvisor/utils/responses';
import moment, { Moment } from 'moment';

const HourMs = 1000 * 60 * 60;
const DayMs = HourMs * 24;
const WeekMs = DayMs * 7;

export const getFirstDayOfAWeek = (
  semester: CurrentSemester,
  week: number,
): Moment => {
  const startDateMs = moment(semester.startDate).valueOf();
  return moment(startDateMs + WeekMs * week - DayMs * 7 + HourMs);
};
