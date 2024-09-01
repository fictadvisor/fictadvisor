import { DisciplineTypeEnum, SortQATParam } from '@fictadvisor/utils/enums';
import { QueryAllDisciplineTeacherForPollDTO } from '@fictadvisor/utils/requests';

import { CheckboxOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxOption';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

export const PollTeacherInitialValues: QueryAllDisciplineTeacherForPollDTO = {
  search: '',
  order: 'asc',
  sort: SortQATParam.LAST_NAME,
};

export const filterOptions: DropDownOption[] = [
  { id: 'firstName', label: 'Іменем' },
  { id: 'rating', label: 'Рейтингом' },
  { id: 'lastName', label: 'Прізвищем' },
];

export const disciplineTypes: CheckboxOption[] = [
  {
    label: 'Лекції',
    value: DisciplineTypeEnum.LECTURE,
  },
  {
    label: 'Лабораторні',
    value: DisciplineTypeEnum.LABORATORY,
  },
  {
    label: 'Практики',
    value: DisciplineTypeEnum.PRACTICE,
  },
  {
    label: 'Екзамени',
    value: DisciplineTypeEnum.EXAM,
  },
  {
    label: 'Консультації',
    value: DisciplineTypeEnum.CONSULTATION,
  },
  {
    label: 'Відпрацювання',
    value: DisciplineTypeEnum.WORKOUT,
  },
];
