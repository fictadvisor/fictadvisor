import { Teacher } from '@/types/teacher';

export enum QuestionType {
  TOGGLE = 'TOGGLE',
  TEXT = 'TEXT',
  SCALE = 'SCALE',
}

export enum QuestionDisplay {
  AMOUNT = 'AMOUNT',
  PERCENT = 'PERCENT',
  TEXT = 'TEXT',
}

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

export type PollTeacher = Omit<Teacher, 'roles'>;

export interface Category {
  name: string;
  count: number;
  questions: Question[];
}
