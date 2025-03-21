import { DbRole } from './role.entity';
import { DbStudent } from './student.entity';

export class DbUserRole {
  student?: DbStudent;
  studentId: string;
  role?: DbRole;
  roleId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
