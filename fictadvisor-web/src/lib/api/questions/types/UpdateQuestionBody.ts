import { AdminQuestionDisplay } from '@/components/pages/admin/admin-questions/common/types';
import { QuestionType } from '@/types/poll';

export interface UpdateQuestionBody {
  id?: string;
  order?: number;
  category?: string;
  name?: string;
  criteria?: string;
  isRequired?: boolean;
  text?: string;
  type?: QuestionType;
  description?: string;
  display?: AdminQuestionDisplay;
}
