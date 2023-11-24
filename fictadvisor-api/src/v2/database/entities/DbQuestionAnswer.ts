import { Question, DisciplineTeacher, Discipline } from '@prisma/client';

export class DbQuestionAnswer {
  disciplineTeacherId: string;
  questionId: string;
  userId: string;
  value: string;
  question: Question;
  disciplineTeacher: DisciplineTeacher & {
    discipline: Discipline,
  };
}