import { DbGroup } from './group.entity';
import { DbRole } from './role.entity';

export class DbGroupRole {
  group?: DbGroup;
  groupId: string;
  role?: DbRole;
  roleId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
