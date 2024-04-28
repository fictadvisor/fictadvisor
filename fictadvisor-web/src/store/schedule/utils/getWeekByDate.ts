import { CurrentSemester } from '@fictadvisor/utils/responses';
import moment, { Moment } from 'moment';

const WeekMs = 1000 * 60 * 60 * 24 * 7;
export const getWeekByDate = (
  semester: CurrentSemester,
  date: Moment,
): number => {
  const startTimeMs = moment(semester.startDate).valueOf();
  const thisDateMs = date.valueOf();

  const delta = thisDateMs - startTimeMs;
  const decimalWeek = delta / WeekMs;

  return Math.ceil(decimalWeek % 1 === 0 ? decimalWeek + 1 : decimalWeek);
};
