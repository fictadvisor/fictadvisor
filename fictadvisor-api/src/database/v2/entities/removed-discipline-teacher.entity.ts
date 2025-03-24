import { DbDisciplineTeacher } from './discipline-teacher.entity';
import { DbStudent } from './student.entity';

export class DbRemovedDisciplineTeacher {
  studentId: string;
  student?: DbStudent;
  disciplineTeacherId: string;
  disciplineTeacher?: DbDisciplineTeacher;
  createdAt: Date | null;
  updatedAt: Date | null;
}
