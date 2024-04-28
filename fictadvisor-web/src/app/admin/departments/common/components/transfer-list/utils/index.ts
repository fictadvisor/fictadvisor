import { TeacherWithRolesAndCathedrasResponse } from '@fictadvisor/utils/responses';

export const filterChecked = (
  a: TeacherWithRolesAndCathedrasResponse[],
  b: TeacherWithRolesAndCathedrasResponse[],
) => {
  return a.filter(value => b.indexOf(value) === -1);
};

export const intersection = (
  a: TeacherWithRolesAndCathedrasResponse[],
  b: TeacherWithRolesAndCathedrasResponse[],
) => {
  return a.filter(value => b.indexOf(value) !== -1);
};
