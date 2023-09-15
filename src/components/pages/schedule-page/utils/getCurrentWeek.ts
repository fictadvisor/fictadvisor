import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';
export const getCurrentWeek = (semester: GetCurrentSemester) => {
  const startDateMs = new Date(semester.startDate).getTime();
  const nowDateMs = new Date().getTime();

  const weekFloating = (nowDateMs - startDateMs) / (1000 * 60 * 60 * 24 * 7);

  const currentWeek = Math.ceil(weekFloating);

  return currentWeek;
};
