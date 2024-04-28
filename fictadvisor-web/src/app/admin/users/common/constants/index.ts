import { State } from '@fictadvisor/utils/enums';

import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

export const UserStateOptions: DropDownOption[] = [
  { id: State.APPROVED, label: 'Верифікований' },
  { id: State.DECLINED, label: 'Не верифікований' },
  { id: State.PENDING, label: 'В очікуванні' },
];
