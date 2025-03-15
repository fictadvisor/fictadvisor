import { DbGroupRole } from './DbGroupRole';
import { DbGrant } from './DbGrant';
import { DbUserRole } from './DbUserRole';
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

  @AutoMap(() => DbUserRole)
    parent?: DbUserRole | null;

  @AutoMap(() => [DbGrant])
    grants?: DbGrant[];

  @AutoMap(() => [DbUserRole])
    userRoles?: DbUserRole[];

  @AutoMap(() => [DbGroupRole])
    groupRoles?: DbGroupRole[];

  createdAt?: Date | null;
  updatedAt?: Date | null;
}
