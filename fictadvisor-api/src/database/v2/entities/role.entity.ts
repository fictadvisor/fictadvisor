import { DbGrant } from './grant.entity';
import { RoleName } from '@prisma-client/fictadvisor';
import { AutoMap } from '@automapper/classes';

export class DbBaseRole {
  @AutoMap()
    id: string;

  @AutoMap(() => String)
    name: RoleName;

  @AutoMap()
    weight: number;

  @AutoMap(() => String)
    parentId: string | null;

  @AutoMap(() => String)
    displayName: string | null;

  createdAt: Date | null;
  updatedAt: Date | null;
}

/** RoleRepository: `grants: true` */
export class DbRole extends DbBaseRole {
  @AutoMap(() => [DbGrant])
    grants: DbGrant[];
}
