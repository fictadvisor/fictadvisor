import { SortQACParam } from '@fictadvisor/utils/enums';
import { QueryAllCathedrasDTO } from '@fictadvisor/utils/requests';

import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

export const AdminDepartmentsSortOptions: DropDownOption[] = [
  { id: 'name', label: 'Іменем' },
  { id: 'teachers', label: 'Кількістю Вчителів' },
];

export const AdminDepartmentsInitialValues: QueryAllCathedrasDTO = {
  search: '',
  order: 'asc',
  sort: SortQACParam.NAME,
  divisions: [],
};
