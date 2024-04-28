import {
  QuestionDisplay,
  QuestionType,
  SortQAQParam,
} from '@fictadvisor/utils/enums';
import { QueryAllQuestionDTO } from '@fictadvisor/utils/requests';

import { AdminQuestion } from '../types';

export const initialValues: QueryAllQuestionDTO = {
  search: '',
  order: 'asc',
  sort: SortQAQParam.QUESTION_TEXT,
  types: [QuestionType.SCALE],
};

export const initialQuestionInfoValues: AdminQuestion = {
  id: '',
  order: 0,
  name: '',
  isRequired: false,
  text: '',
  type: QuestionType.SCALE,
  display: QuestionDisplay.AMOUNT,
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
  { id: QuestionDisplay.AMOUNT, label: 'Кількість' },
  { id: QuestionDisplay.CIRCLE, label: 'Коло' },
  { id: QuestionDisplay.TEXT, label: 'Текст' },
  { id: QuestionDisplay.RADAR, label: 'Радар' },
];
