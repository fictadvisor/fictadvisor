import { AdminQuestion } from '@/components/pages/admin/questions-admin-page/types';
import { Pagination } from '@/types/api';

export interface GetAllQuestionsResponse {
  questions: AdminQuestion[];
  pagination: Pagination;
}
