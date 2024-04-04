import { TeacherRole } from '@/types/teacher';

import { AdminSearchFormFields } from '../types';

export const initialValues: AdminSearchFormFields = {
  search: '',
  sort: 'lastName',
  order: 'asc',
  cathedrasId: [],
  roles: [],
};

export const teacherRoles: TeacherRole[] = [
  TeacherRole.LECTURER,
  TeacherRole.LABORANT,
  TeacherRole.PRACTICIAN,
  TeacherRole.EXAMINER,
  TeacherRole.OTHER,
];
