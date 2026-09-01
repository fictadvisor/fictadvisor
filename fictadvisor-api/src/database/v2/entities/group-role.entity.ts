import { AutoMap } from '@automapper/classes';

export class DbGroupRole {
  @AutoMap()
    groupId: string;

  @AutoMap()
    roleId: string;

  createdAt: Date | null;
  updatedAt: Date | null;
}
