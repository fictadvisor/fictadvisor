import { Discipline, Question } from '@prisma/client';

export class DbDisciplineTeacherWithAnswers {
  id: string;
  teacherId: string;
  disciplineId: string;
  discipline: Discipline;
  questionAnswers: {
      disciplineTeacherId: string,
      questionId: string,
      userId: string,
      value: string,
      question: Question,
    }[];
}