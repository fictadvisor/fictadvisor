import { QuestionDisplay, QuestionType } from '@fictadvisor/utils/enums';

export interface Question {
  id: string;
  name: string;
  criteria: string;
  isRequired: boolean;
  text: string;
  type: QuestionType;
  description: string;
  display: QuestionDisplay;
}

export interface Answer {
  questionId: string;
  value: string;
}

export interface Category {
  name: string;
  count: number;
  questions: Question[];
}
