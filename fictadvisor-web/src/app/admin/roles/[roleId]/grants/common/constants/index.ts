import { SortQAGrantsParam } from '@fictadvisor/utils/enums';

import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

import { GrantSet, GrantsSearchFormFields } from '../types';

export const sortOptions: DropDownOption[] = [
  { id: 'permission', label: 'За назвою' },
  { id: 'weight', label: 'За вагою' },
  { id: 'set', label: 'За статусом' },
];

export const GrantsOptions: DropDownOption[] = [
  { id: 'given', label: 'Надане' },
  { id: 'taken', label: 'Забране' },
];

export const GrantsInitialValues: GrantsSearchFormFields = {
  search: '',
  order: 'asc',
  sort: SortQAGrantsParam.PERMISSION,
  set: 'given' as GrantSet,
};
