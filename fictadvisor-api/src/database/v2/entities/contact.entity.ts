import { EntityType } from '@prisma-client/fictadvisor';
import { AutoMap } from '@automapper/classes';

export class DbContact {
  @AutoMap()
    id: string;

  @AutoMap()
    name: string;

  @AutoMap()
    displayName: string;

  @AutoMap()
    link: string | null;

  @AutoMap(() => String)
    entityType: EntityType;

  @AutoMap()
    entityId: string;

  createdAt: Date | null;
  updatedAt: Date | null;
}
