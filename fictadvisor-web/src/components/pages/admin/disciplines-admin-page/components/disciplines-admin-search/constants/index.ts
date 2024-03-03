import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

import { DisciplinesAdminSearchFormFields } from '../types';

export const initialValues: DisciplinesAdminSearchFormFields = {
  search: '',
  sort: 'name',
  order: 'asc',
  groups: [],
  semesters: [],
  teachers: [],
};

export const sortOptions: DropDownOption[] = [
  { id: 'name', label: 'За назвою' },
  { id: 'semester', label: 'За роком і семестром' },
  { id: 'group', label: 'За групою' },
];

export const semesterValues = [1, 2];

export const disciplineTeacherInitialValues = {
  id: '',
  roles: [],
  firstName: '',
  middleName: '',
  lastName: '',
  avatar: '',
  description: '',
  rating: 0,
  contacts: [],
  cathedras: [],
  disciplineTeacherId: '',
  subject: { id: '', name: '' },
};
