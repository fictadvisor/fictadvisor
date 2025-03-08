import { AutoMap } from '@automapper/classes';
import { DbDisciplineTeacher } from './discipline-teacher.entity';
import { DbStudent } from './student.entity';

export class DbRemovedDisciplineTeacher {
  @AutoMap()
    studentId: string;

  @AutoMap(() => DbStudent)
    student?: DbStudent;

  @AutoMap()
    disciplineTeacherId: string;

  @AutoMap(() => DbDisciplineTeacher)
    disciplineTeacher?: DbDisciplineTeacher;

  createdAt: Date | null;
  updatedAt: Date | null;
}
