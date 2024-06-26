import { TeacherRole } from '@fictadvisor/utils/enums';

export const rolesOptions = [
  { value: TeacherRole.EXAMINER, label: 'Екзаменатор' },
  { value: TeacherRole.LABORANT, label: 'Лаборант' },
  { value: TeacherRole.LECTURER, label: 'Викладач' },
  { value: TeacherRole.OTHER, label: 'Інше' },
  { value: TeacherRole.PRACTICIAN, label: 'Практик' },
];
