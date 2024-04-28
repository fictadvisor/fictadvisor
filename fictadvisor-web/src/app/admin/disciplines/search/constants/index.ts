import { QueryAllDisciplinesDTO } from '@fictadvisor/utils/requests';

import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

export const initialValues: QueryAllDisciplinesDTO = {
  search: '',
  sort: 'name',
  order: 'desc',
  groups: [],
  semesters: [],
  teachers: [],
};

export const sortOptions: DropDownOption[] = [
  { id: 'name', label: 'За назвою' },
  { id: 'semester', label: 'За роком і семестром' },
  { id: 'group', label: 'За групою' },
];

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
