import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

export const sortOptions: DropDownOption[] = [
  { id: 'permission', label: 'За назвою' },
  { id: 'weight', label: 'За вагою' },
  { id: 'set', label: 'За статусом' },
];

export const GrantsOptions: DropDownOption[] = [
  { id: 'given', label: 'Забране' },
  { id: 'taken', label: 'Надане' },
];
