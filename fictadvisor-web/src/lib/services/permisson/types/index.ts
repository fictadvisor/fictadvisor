import { PERMISSION } from '@fictadvisor/utils/security';

import { Group } from '@/types/group';
import { Teacher } from '@/types/teacher';
import { User, UserGroupRole } from '@/types/user';

export interface PermissionData {
  userId?: User['id'];
  groupId?: Group['id'];
  roleId?: UserGroupRole;
  teacherId?: Teacher['id'];
}

export type PermissionResponse = {
  [key in PERMISSION]: boolean;
};
