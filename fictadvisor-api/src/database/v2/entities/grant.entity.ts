import { DbRole } from './role.entity';
import { AutoMap } from '@automapper/classes';

export class DbGrant {
  @AutoMap()
    id: string;

  @AutoMap(() => DbRole)
    role?: DbRole;

  @AutoMap()
    roleId: string;

  @AutoMap()
    permission: string;

  @AutoMap()
    set: boolean;

  @AutoMap()
    weight: number;

  createdAt: Date | null;
  updatedAt: Date | null;
}
