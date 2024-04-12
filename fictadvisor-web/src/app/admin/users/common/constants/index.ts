import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { UserGroupState } from '@/types/user';

export const UserStateOptions: DropDownOption[] = [
  { id: UserGroupState.APPROVED, label: 'Верифікований' },
  { id: UserGroupState.DECLINED, label: 'Не верифікований' },
  { id: UserGroupState.PENDING, label: 'В очікуванні' },
];
