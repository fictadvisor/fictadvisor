import { Discipline, DisciplineTeacherRole, Question } from '@prisma/client';

export class DbDisciplineTeacherWithAnswers {
  id: string;
  teacherId: string;
  disciplineId: string;
  discipline: Discipline;
  roles: DisciplineTeacherRole[];
  questionAnswers: {
      disciplineTeacherId: string,
      questionId: string,
      userId: string,
      value: string,
      question: Question,
    }[];
}