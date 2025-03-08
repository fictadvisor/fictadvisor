import { DbRole } from './DbRole';
import { DbStudent } from './DbStudent';

export class DbUserRole {
  student?: DbStudent;
  studentId: string;
  role?: DbRole;
  roleId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
