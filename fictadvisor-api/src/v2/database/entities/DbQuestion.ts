import { QuestionType } from '@fictadvisor/utils/enums';

export class DbQuestion {
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
}
