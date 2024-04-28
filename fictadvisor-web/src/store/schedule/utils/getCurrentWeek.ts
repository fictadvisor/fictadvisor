import { CurrentSemester } from '@fictadvisor/utils/responses';
import moment from 'moment';

export const getCurrentWeek = (semester: CurrentSemester) => {
  const startDateMs = moment(semester.startDate).valueOf();
  const nowDateMs = moment().valueOf();

  const weekFloating = (nowDateMs - startDateMs) / (1000 * 60 * 60 * 24 * 7);

  return Math.ceil(weekFloating);
};
