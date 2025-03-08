import { DbGroup } from './DbGroup';
import { DbRole } from './DbRole';

export class DbGroupRole {
  group?: DbGroup;
  groupId: string;
  role?: DbRole;
  roleId: string;
  createdAt: Date | null;
  updateAt: Date | null;
}
