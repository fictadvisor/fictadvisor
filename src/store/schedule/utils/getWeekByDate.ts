import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';

export const getWeekByDate = (
  semester: GetCurrentSemester,
  date: Date,
): number => {
  const delta = date.getTime() - new Date(semester.startDate).getTime();
  const week = Math.ceil(delta / (1000 * 60 * 60 * 24 * 7));
  return week === 0 ? 1 : week;
};
