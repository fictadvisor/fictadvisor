import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

import { GroupsSearchFormFields } from '../../common/types';

export const sortOptions: DropDownOption[] = [
  { id: 'code', label: 'За назвою' },
  { id: 'admission', label: 'За роком вступу' },
  { id: 'captain', label: "За ім'ям старости" },
];

export const initialValues: GroupsSearchFormFields = {
  search: '',
  order: 'asc',
  sort: 'code',
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
