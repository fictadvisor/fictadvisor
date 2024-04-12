import { Teacher } from '@/types/teacher';

export const filterChecked = (a: Teacher[], b: Teacher[]) => {
  return a.filter(value => b.indexOf(value) === -1);
};

export const intersection = (a: Teacher[], b: Teacher[]) => {
  return a.filter(value => b.indexOf(value) !== -1);
};
