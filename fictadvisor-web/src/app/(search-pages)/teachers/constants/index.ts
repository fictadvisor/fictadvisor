import { Breadcrumb } from '@/components/common/ui/breadcrumbs/types';
import { CheckboxesDropdownOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxesDropdown';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { TeacherRole } from '@/types/teacher';

export const filterOptions: DropDownOption[] = [
  { id: 'firstName', label: 'Іменем' },
  { id: 'lastName', label: 'Прізвищем' },
];

export const roleOptions: CheckboxesDropdownOption[] = [
  { label: 'Лекції', value: TeacherRole.LECTURER },
  { label: 'Лабораторні', value: TeacherRole.LABORANT },
  { label: 'Практики', value: TeacherRole.PRACTICIAN },
  { label: 'Екзамени', value: TeacherRole.EXAMINER },
  { label: 'Інше', value: TeacherRole.OTHER },
];

export const breadcrumbs: Breadcrumb[] = [
  {
    label: 'Головна',
    href: '/',
  },
  {
    label: 'Викладачі',
    href: '/teachers',
  },
];

export const PAGE_SIZE = 20;
