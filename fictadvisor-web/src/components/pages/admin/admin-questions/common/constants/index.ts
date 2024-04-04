import { QuestionType } from '@/types/poll';

import { AdminQuestion } from '../types';
import { AdminQuestionDisplay, QuestionSearchFormFields } from '../types';

export const initialValues: QuestionSearchFormFields = {
  search: '',
  order: 'asc',
  sort: 'text',
  types: [QuestionType.SCALE],
};

export const initialQuestionInfoValues: AdminQuestion = {
  id: '',
  order: 0,
  name: '',
  isRequired: false,
  text: '',
  type: QuestionType.SCALE,
  display: AdminQuestionDisplay.AMOUNT,
  description: '',
  category: '',
  criteria: '',
};

export const typesOptions = [
  { id: QuestionType.SCALE, label: 'Шкала' },
  { id: QuestionType.TEXT, label: 'Відкрите питання' },
  { id: QuestionType.TOGGLE, label: 'Радіобатони' },
];

export const sortOptions = [
  { id: 'order', label: 'За номером' },
  { id: 'text', label: 'За питанням' },
  { id: 'category', label: 'За категорією' },
];

export const displayOptions = [
  { id: AdminQuestionDisplay.AMOUNT, label: 'Кількість' },
  { id: AdminQuestionDisplay.CIRCLE, label: 'Коло' },
  { id: AdminQuestionDisplay.TEXT, label: 'Текст' },
  { id: AdminQuestionDisplay.RADAR, label: 'Радар' },
];
