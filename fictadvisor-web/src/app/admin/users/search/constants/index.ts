import { CheckboxOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxOption';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { TagColor } from '@/components/common/ui/tag/types';
import { UserGroupState } from '@/types/user';

import { UserSearchFormFields } from '../types';

export const sortOptions: DropDownOption[] = [
  { id: 'username', label: 'За назвою' },
  { id: 'email', label: 'За поштою' },
];
export const stateOptions: CheckboxOption[] = [
  { value: UserGroupState.APPROVED, label: 'Верифікований' },
  { value: UserGroupState.DECLINED, label: 'Не верифікований' },
  { value: UserGroupState.PENDING, label: 'В очікуванні' },
];

export const TagColorMapper: Record<string, TagColor> = {
  PENDING: TagColor.ORANGE,
  APPROVED: TagColor.SUCCESS,
  DECLINED: TagColor.ERROR,
};
export const TagTextMapper: Record<string, string> = {
  PENDING: 'В очікуванні',
  APPROVED: 'Верифікований',
  DECLINED: 'Не верифікований',
};

export const UserInitialValues: UserSearchFormFields = {
  search: '',
  order: 'asc',
  sort: 'username',
  state: [],
};
