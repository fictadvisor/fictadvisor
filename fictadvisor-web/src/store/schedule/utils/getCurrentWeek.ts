import moment from 'moment';

import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';
export const getCurrentWeek = (semester: GetCurrentSemester) => {
  const startDateMs = moment(semester.startDate).valueOf();
  const nowDateMs = moment().valueOf();

  const weekFloating = (nowDateMs - startDateMs) / (1000 * 60 * 60 * 24 * 7);

  return Math.ceil(weekFloating);
};
