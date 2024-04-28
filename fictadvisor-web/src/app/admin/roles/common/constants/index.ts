import { RoleName, SortQARParam } from '@fictadvisor/utils/enums';
import { QueryAllRolesDTO } from '@fictadvisor/utils/requests';

import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { TagColor } from '@/components/common/ui/tag/types';

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

export const RolesInitialValues: QueryAllRolesDTO = {
  search: '',
  order: 'asc',
  sort: SortQARParam.DISPLAYNAME,
  name: '' as RoleName,
};

export const TagColorMapper: Record<RoleName, TagColor> = {
  [RoleName.USER]: TagColor.ORANGE,
  [RoleName.STUDENT]: TagColor.SUCCESS,
  [RoleName.ADMIN]: TagColor.ERROR,
  [RoleName.CAPTAIN]: TagColor.INDIGO,
  [RoleName.MODERATOR]: TagColor.VIOLET,
};
export const TagTextMapper: Record<RoleName, string> = {
  [RoleName.USER]: 'Користувач',
  [RoleName.STUDENT]: 'Студент',
  [RoleName.ADMIN]: 'Адмін',
  [RoleName.CAPTAIN]: 'Cтароста',
  [RoleName.MODERATOR]: 'Заст. староста',
};
