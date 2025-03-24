import { DbDisciplineTeacherRole } from './discipline-teacher-role.entity';
import { DbDiscipline } from './discipline.entity';
import { DbTeacher } from './teacher.entity';
import { DbQuestionAnswer } from './question-answer.entity';
import { DbRemovedDisciplineTeacher } from './removed-discipline-teacher.entity';

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
