import { DbGroup } from './group.entity';

export class DbSelectiveAmount {
  group?: DbGroup;
  groupId: string;
  year: number;
  semester: number;
  amount: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}
