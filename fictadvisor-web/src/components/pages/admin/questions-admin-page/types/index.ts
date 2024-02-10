import { QuestionType } from '@/types/poll';

export interface QuestionSearchFormFields {
  search: string;
  order: 'asc' | 'desc';
  sort: 'text' | 'order' | 'category';
  types: [QuestionType];
}

export interface AdminQuestion {
  id?: string;
  name: string;
  order: number;
  criteria?: string;
  category: string;
  isRequired: boolean;
  text: string;
  type: QuestionType;
  description?: string;
  display: AdminQuestionDisplay;
}

export enum AdminQuestionDisplay {
  AMOUNT = 'AMOUNT',
  RADAR = 'RADAR',
  CIRCLE = 'CIRCLE',
  TEXT = 'TEXT',
}
