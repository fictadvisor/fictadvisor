import { DbGroup } from './group.entity';
import { DbRole } from './role.entity';
import { AutoMap } from '@automapper/classes';

export class DbGroupRole {
  @AutoMap(() => DbGroup)
    group?: DbGroup;

  @AutoMap()
    groupId: string;

  @AutoMap(() => DbRole)
    role?: DbRole;

  @AutoMap()
    roleId: string;

  createdAt: Date | null;
  updatedAt: Date | null;
}
