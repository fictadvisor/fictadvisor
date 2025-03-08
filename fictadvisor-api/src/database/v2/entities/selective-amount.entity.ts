import { DbGroup } from './group.entity';
import { AutoMap } from '@automapper/classes';

export class DbSelectiveAmount {
  @AutoMap(() => DbGroup)
    group?: DbGroup;

  @AutoMap()
    groupId: string;

  @AutoMap()
    year: number;

  @AutoMap()
    semester: number;

  @AutoMap()
    amount: number;

  createdAt: Date | null;
  updatedAt: Date | null;
}
