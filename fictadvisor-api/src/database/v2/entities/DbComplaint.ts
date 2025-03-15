import { DbGroup } from './DbGroup';
import { DbTeacher } from './DbTeacher';

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
