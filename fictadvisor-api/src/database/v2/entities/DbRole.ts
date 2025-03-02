import { Grant, GroupRole, UserRole } from '@prisma/client';
import { RoleName } from '@fictadvisor/utils/enums';

export class DbRole {
  id: string;
  name: RoleName;
  weight: number;
  parentId: string | null;
  grants: Grant[];
  userRoles: UserRole[];
  groupRole: GroupRole;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  displayName: string;
}
