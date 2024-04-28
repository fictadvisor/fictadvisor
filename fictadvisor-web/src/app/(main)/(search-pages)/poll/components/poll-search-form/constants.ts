import { SortQATParam, TeacherRole } from '@fictadvisor/utils/enums';
import { QueryAllDisciplineTeacherForPollDTO } from '@fictadvisor/utils/requests';

import { CheckboxOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxOption';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

export const PollTeacherInitialValues: QueryAllDisciplineTeacherForPollDTO = {
  search: '',
  order: 'asc',
  sort: SortQATParam.LAST_NAME,
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
