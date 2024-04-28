import { QuestionDisplay, QuestionType } from '@fictadvisor/utils/enums';

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
  display: QuestionDisplay;
}
