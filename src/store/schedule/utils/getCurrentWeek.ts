import dayjs from 'dayjs';

import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';
export const getCurrentWeek = (semester: GetCurrentSemester) => {
  const startDateMs = dayjs(semester.startDate).tz().valueOf();
  const nowDateMs = dayjs().tz().valueOf();

  const weekFloating = (nowDateMs - startDateMs) / (1000 * 60 * 60 * 24 * 7);

  return Math.ceil(weekFloating);
};
