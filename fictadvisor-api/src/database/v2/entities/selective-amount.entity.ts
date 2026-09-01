import { AutoMap } from '@automapper/classes';

export class DbSelectiveAmount {
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
