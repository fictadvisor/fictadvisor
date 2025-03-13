import { AutoMap } from '@automapper/classes';
import { DbGroup } from './DbGroup';
import { DbTeacher } from './DbTeacher';

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
    teacherId: string | null;

  @AutoMap()
    title: string;

  @AutoMap()
    message: string;

  createdAt: Date;
}
