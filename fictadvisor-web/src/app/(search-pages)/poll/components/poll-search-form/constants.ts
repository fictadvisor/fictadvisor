import { CheckboxOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxOption';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { TeacherRole } from '@/types/teacher';

import { PollSearchFormFields } from './types';

export const PollTeacherInitialValues: PollSearchFormFields = {
  search: '',
  order: 'asc',
  sort: 'lastName',
  roles: [],
};

export const filterOptions: DropDownOption[] = [
  { id: 'firstName', label: 'Іменем' },
  { id: 'rating', label: 'Рейтингом' },
  { id: 'lastName', label: 'Прізвищем' },
];

export const teachersRoles: CheckboxOption[] = [
  {
    label: 'Лекції',
    value: TeacherRole.LECTURER,
  },
  {
    label: 'Лабораторні',
    value: TeacherRole.LABORANT,
  },
  {
    label: 'Практики',
    value: TeacherRole.PRACTICIAN,
  },
  {
    label: 'Екзамени',
    value: TeacherRole.EXAMINER,
  },
  {
    label: 'Інше',
    value: TeacherRole.OTHER,
  },
];
