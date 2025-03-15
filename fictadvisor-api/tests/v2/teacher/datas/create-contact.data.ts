import { EntityType } from '@prisma/client/fictadvisor';

export class CreateContactData {
  entityId: string;
  entityType: EntityType;
  name: string;
  displayName: string;
  link?: string;
}
