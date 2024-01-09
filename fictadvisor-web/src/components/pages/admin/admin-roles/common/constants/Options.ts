import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { RoleName } from '@/types/role';

export const sortOptions: DropDownOption[] = [
  { id: 'displayName', label: 'За назвою' },
  { id: 'weight', label: 'За вагою' },
  { id: 'createdAt', label: 'За часом створення' },
  { id: 'id', label: 'За айді' },
];

export const RoleNameOptions: DropDownOption[] = [
  { id: RoleName.ADMIN, label: 'Адмін' },
  { id: RoleName.CAPTAIN, label: 'Cтароста' },
  { id: RoleName.MODERATOR, label: 'Заст. староста' },
  { id: RoleName.STUDENT, label: 'Студент' },
  { id: RoleName.USER, label: 'Користувач' },
];
