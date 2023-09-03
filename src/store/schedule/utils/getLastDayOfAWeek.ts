import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';

export const getLastDayOfAWeek = (
  semester: GetCurrentSemester,
  week: number,
): Date => {
  const startDate = new Date(semester.startDate);

  const startWeekDate = new Date(startDate);
  startWeekDate.setDate(startDate.getDate() + (1 - startDate.getDay()));

  const lastDayOfWeek = new Date(startWeekDate);
  lastDayOfWeek.setDate(startWeekDate.getDate() + (week - 1) * 7 + 6);

  return lastDayOfWeek;
};
