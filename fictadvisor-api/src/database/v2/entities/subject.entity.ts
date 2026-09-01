import { AutoMap } from '@automapper/classes';

export class DbSubject {
  @AutoMap()
    id: string;

  @AutoMap()
    name: string;

  createdAt: Date | null;
  updatedAt: Date | null;
}
