import { DbGroup } from './group.entity';
import { DbTeacher } from './teacher.entity';
import { AutoMap } from '@automapper/classes';

export class DbComplaint {
  @AutoMap()
    id: string;

  @AutoMap()
    fullName: string | null;

  @AutoMap(() => DbGroup)
    group?: DbGroup;

  @AutoMap()
    groupId: string | null;

  @AutoMap(() => DbTeacher)
    teacher: DbTeacher;

  @AutoMap()
    teacherId: string;

  @AutoMap()
    title: string;

  @AutoMap()
    message: string;

  createdAt: Date;
}
