import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { UserGroupRole } from '@/types/user';

export const StudentRoleOptions: DropDownOption[] = [
  { id: UserGroupRole.CAPTAIN, label: 'Староста' },
  { id: UserGroupRole.MODERATOR, label: 'Заст. старости' },
  { id: UserGroupRole.STUDENT, label: 'Студент' },
];
