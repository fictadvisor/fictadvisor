import { DbDisciplineTeacherRole } from './DbDisciplineTeacherRole';
import { DbDiscipline } from './DbDiscipline';
import { DbTeacher } from './DbTeacher';
import { DbQuestionAnswer } from './DbQuestionAnswer';
import { DbRemovedDisciplineTeacher } from './DbRemovedDisciplineTeacher';

export class DbDisciplineTeacher {
  id: string;
  discipline?: DbDiscipline;
  disciplineId: string;
  teacher?: DbTeacher;
  teacherId: string;
  roles?: DbDisciplineTeacherRole[];
  questionAnswers?: DbQuestionAnswer[];
  removedDisciplineTeachers?: DbRemovedDisciplineTeacher[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
