import { TeacherWithRolesAndCathedrasResponse } from '@fictadvisor/utils/responses';

export const filterChecked = (
  a: TeacherWithRolesAndCathedrasResponse[],
  b: TeacherWithRolesAndCathedrasResponse[],
) => {
  return a.filter(a => !b.some(b => b.id === a.id));
};

export const intersection = (
  a: TeacherWithRolesAndCathedrasResponse[],
  b: TeacherWithRolesAndCathedrasResponse[],
) => {
  return a.filter(a => b.some(b => b.id === a.id));
};
