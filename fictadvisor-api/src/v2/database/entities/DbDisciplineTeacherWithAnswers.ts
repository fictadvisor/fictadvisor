import { Discipline, Question } from '@prisma/client';
import { DisciplineTypeEnum } from '@fictadvisor/utils';

export class DbDisciplineTeacherWithAnswers {
  id: string;
  teacherId: string;
  disciplineId: string;
  discipline: Discipline;
  roles: DisciplineTypeEnum[];
  questionAnswers: {
      disciplineTeacherId: string,
      questionId: string,
      userId: string,
      value: string,
      question: Question,
    }[];
}
