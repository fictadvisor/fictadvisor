import { DbBaseRole } from './role.entity';
import { AutoMap } from '@automapper/classes';

/** GroupRepository and StudentRepository both load roles as `roles: { role: true }`. */
export class DbUserRole {
  @AutoMap()
    studentId: string;

  @AutoMap()
    roleId: string;

  @AutoMap(() => DbBaseRole)
    role: DbBaseRole;

  createdAt: Date | null;
  updatedAt: Date | null;
}
