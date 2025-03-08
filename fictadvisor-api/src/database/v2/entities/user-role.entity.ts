import { DbRole } from './role.entity';
import { DbStudent } from './student.entity';
import { AutoMap } from '@automapper/classes';

export class DbUserRole {
  @AutoMap(() => DbStudent)
    student?: DbStudent;

  @AutoMap()
    studentId: string;

  @AutoMap(() => DbRole)
    role?: DbRole;

  @AutoMap()
    roleId: string;

  createdAt: Date | null;
  updatedAt: Date | null;
}
