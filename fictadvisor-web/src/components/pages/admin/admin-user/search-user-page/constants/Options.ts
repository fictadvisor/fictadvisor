import { CheckboxOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxOption';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { UserGroupState } from '@/types/user';

export const sortOptions: DropDownOption[] = [
  { id: 'username', label: 'За назвою' },
  { id: 'email', label: 'За поштою' },
];
export const stateOptions: CheckboxOption[] = [
  { value: UserGroupState.APPROVED, label: 'Верифікований' },
  { value: UserGroupState.DECLINED, label: 'Не верифікований' },
  { value: UserGroupState.PENDING, label: 'В очікуванні' },
];
