import { GroupRoles } from '@fictadvisor/utils/enums';

import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

export const StudentRoleOptions: DropDownOption[] = [
  { id: GroupRoles.CAPTAIN, label: 'Староста' },
  { id: GroupRoles.MODERATOR, label: 'Заст. старости' },
  { id: GroupRoles.STUDENT, label: 'Студент' },
];
