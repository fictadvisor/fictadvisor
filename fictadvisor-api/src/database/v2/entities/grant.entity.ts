import { AutoMap } from '@automapper/classes';

export class DbGrant {
  @AutoMap()
    id: string;

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
