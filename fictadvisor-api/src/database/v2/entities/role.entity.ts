import { DbGroupRole } from './group-role.entity';
import { DbGrant } from './grant.entity';
import { DbUserRole } from './user-role.entity';
import { RoleName } from '@prisma/client/fictadvisor';
import { AutoMap } from '@automapper/classes';

export class DbRole {
  @AutoMap()
    id: string;

  @AutoMap(() => String)
    name: RoleName;

  @AutoMap()
    weight: number;

  @AutoMap()
    parentId: string | null;

  @AutoMap()
    displayName: string | null;

  @AutoMap(() => DbRole)
    parent?: DbRole;

  @AutoMap(() => [DbRole])
    children: DbRole[];

  @AutoMap(() => [DbGrant])
    grants?: DbGrant[];

  @AutoMap(() => DbUserRole)
    userRole?: DbUserRole;

  @AutoMap(() => [DbGroupRole])
    groupRoles?: DbGroupRole[];

  createdAt?: Date | null;
  updatedAt?: Date | null;
}
