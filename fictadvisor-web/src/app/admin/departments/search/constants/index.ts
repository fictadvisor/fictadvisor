import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

import { AdminDepartmentSearchFields } from '../types';

export const AdminDepartmentsSortOptions: DropDownOption[] = [
  { id: 'name', label: 'Іменем' },
  { id: 'teachers', label: 'Кількістю Вчителів' },
];

export const AdminDepartmentsInitialValues: AdminDepartmentSearchFields = {
  search: '',
  order: 'asc',
  sort: 'name',
  divisions: [],
};
