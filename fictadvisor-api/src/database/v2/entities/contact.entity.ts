import { EntityType } from '@prisma/client/fictadvisor';

export class DbContact {
  id: string;
  name: string;
  displayName: string;
  link: string | null;
  entityType: EntityType;
  entityId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
