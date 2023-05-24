import { Discipline, DisciplineTeacher, QuestionAnswer, QuestionType, Subject } from '@prisma/client';
export class DbQuestionWithDiscipline {
  id: string;
  category: string;
  name: string;
  order: number;
  description?: string;
  text: string;
  isRequired: boolean;
  criteria?: string;
  type: QuestionType;
  display: string;
  questionAnswers: QuestionAnswer[] & {
    disciplineTeacher: DisciplineTeacher & {
      discipline: Discipline & {
        subject: Subject,
      },
    }
  }[];
}