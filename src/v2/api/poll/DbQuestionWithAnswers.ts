import { QuestionAnswer, QuestionType } from '@prisma/client';
export class DbQuestionWithAnswers {
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
  questionAnswers: QuestionAnswer[];
}