import { CheckboxOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxOption';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { UserGroupRole } from '@/types/user';

export const sortOptions: DropDownOption[] = [
  { id: 'firstName', label: "За ім'ям" },
  { id: 'middleName', label: 'По-батькові' },
  { id: 'lastName', label: 'За прізвищем' },
];
export const roleOptions: CheckboxOption[] = [
  { value: UserGroupRole.CAPTAIN, label: 'Староста' },
  { value: UserGroupRole.MODERATOR, label: 'Заст. старости' },
  { value: UserGroupRole.STUDENT, label: 'Студент' },
];
