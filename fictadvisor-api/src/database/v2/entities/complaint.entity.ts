import { AutoMap } from '@automapper/classes';

export class DbComplaint {
  @AutoMap()
    id: string;

  @AutoMap(() => String)
    fullName: string | null;

  @AutoMap(() => String)
    groupId: string | null;

  @AutoMap()
    teacherId: string;

  @AutoMap()
    title: string;

  @AutoMap()
    message: string;

  createdAt: Date;
}
