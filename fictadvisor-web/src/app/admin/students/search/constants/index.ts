import { GroupRoles, SortQGSParam } from '@fictadvisor/utils/enums';
import { QueryAllStudentsDTO } from '@fictadvisor/utils/requests';

import { CheckboxOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxOption';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { TagColor } from '@/components/common/ui/tag/types';

export const sortOptions: DropDownOption[] = [
  { id: 'firstName', label: "За ім'ям" },
  { id: 'middleName', label: 'По-батькові' },
  { id: 'lastName', label: 'За прізвищем' },
];
export const roleOptions: CheckboxOption[] = [
  { value: GroupRoles.CAPTAIN, label: 'Староста' },
  { value: GroupRoles.MODERATOR, label: 'Заст. старости' },
  { value: GroupRoles.STUDENT, label: 'Студент' },
];

export const StudentInitialValues: QueryAllStudentsDTO = {
  search: '',
  order: 'asc',
  sort: SortQGSParam.FIRST_NAME,
  groups: [],
  roles: [],
};

export const TagColorMapper: Record<string, TagColor> = {
  CAPTAIN: TagColor.ORANGE,
  MODERATOR: TagColor.PRIMARY,
  STUDENT: TagColor.SUCCESS,
  NULL: TagColor.SECONDARY,
};
export const TagTextMapper: Record<string, string> = {
  CAPTAIN: 'Староста',
  MODERATOR: 'Заст. старости',
  STUDENT: 'Студент',
  NULL: 'Немає',
};
