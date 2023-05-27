import { Grant, GroupRole, UserRole, RoleName } from '@prisma/client';

export class DbRole {
  id: string;
  name: RoleName;
  weight: number;
  parentId: string;
  grants: Grant[];
  userRoles: UserRole[];
  groupRole: GroupRole;
}