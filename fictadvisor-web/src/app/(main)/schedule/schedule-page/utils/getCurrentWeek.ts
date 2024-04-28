import { CurrentSemester } from '@fictadvisor/utils/responses';

export const getCurrentWeek = (semester: CurrentSemester) => {
  const startDateMs = new Date(semester.startDate).getTime();
  const nowDateMs = new Date().getTime();

  const weekFloating = (nowDateMs - startDateMs) / (1000 * 60 * 60 * 24 * 7);

  const currentWeek = Math.ceil(weekFloating);

  return currentWeek;
};
