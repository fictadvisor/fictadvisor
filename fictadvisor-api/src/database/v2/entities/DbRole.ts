import { DbGroupRole } from './DbGroupRole';
import { DbGrant } from './DbGrant';
import { DbUserRole } from './DbUserRole';
import { RoleName } from '@prisma/client/fictadvisor';

export class DbRole {
  id: string;
  name: RoleName;
  weight: number;
  parentId: string | null;
  displayName: string | null;
  parent?: DbUserRole;
  children: DbRole[];
  grants?: DbGrant[];
  userRole?: DbUserRole;
  groupRoles?: DbGroupRole[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
