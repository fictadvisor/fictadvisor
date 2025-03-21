import { DbGroup } from './group.entity';
import { DbTeacher } from './teacher.entity';

export class DbComplaint {
  id: string;
  fullName: string | null;
  group?: DbGroup;
  groupId: string | null;
  teacher: DbTeacher;
  teacherId: string;
  title: string;
  message: string;
  createdAt: Date;
}
