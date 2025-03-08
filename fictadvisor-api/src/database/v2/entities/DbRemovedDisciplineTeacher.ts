import { DbDisciplineTeacher } from './DbDisciplineTeacher';
import { DbStudent } from './DbStudent';

export class DbRemovedDisciplineTeacher {
  studentId: string;
  student?: DbStudent;
  disciplineTeacherId: string;
  disciplineTeacher?: DbDisciplineTeacher;
  createdAt: Date | null;
  updatedAt: Date | null;
}
