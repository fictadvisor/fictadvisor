import { SortQAGroupsParam } from '@fictadvisor/utils/enums';
import { QueryAllGroupsDTO } from '@fictadvisor/utils/requests';

import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

export const sortOptions: DropDownOption[] = [
  { id: 'code', label: 'За назвою' },
  { id: 'admission', label: 'За роком вступу' },
  { id: 'captain', label: "За ім'ям старости" },
];

export const initialValues: QueryAllGroupsDTO = {
  search: '',
  order: 'asc',
  sort: SortQAGroupsParam.CODE,
  cathedras: [],
  specialities: [],
  courses: [],
};

export const courseOptions = [
  {
    value: '1',
    label: 'Перший',
  },
  {
    value: '2',
    label: 'Другий',
  },
  {
    value: '3',
    label: 'Третій',
  },
  {
    value: '4',
    label: 'Четвертий',
  },
];
