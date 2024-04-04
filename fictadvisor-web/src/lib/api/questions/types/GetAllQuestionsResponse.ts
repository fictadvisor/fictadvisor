import { AdminQuestion } from '@/components/pages/admin/admin-questions/common/types';
import { Pagination } from '@/types/api';

export interface GetAllQuestionsResponse {
  questions: AdminQuestion[];
  pagination: Pagination;
}
