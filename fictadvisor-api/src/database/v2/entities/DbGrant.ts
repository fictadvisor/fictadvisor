import { DbRole } from './DbRole';

export class DbGrant {
  id: string;
  role?: DbRole;
  roleId: string;
  permission: string;
  set: boolean;
  weight: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}
