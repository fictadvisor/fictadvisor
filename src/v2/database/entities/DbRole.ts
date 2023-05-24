import { Role, Grant, GroupRole, UserRole } from '@prisma/client';

export type DbRole = Role & {
  grants: Grant[],
  userRoles: UserRole[],
  groupRole: GroupRole,
}