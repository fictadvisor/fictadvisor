import { Pagination } from '@/types/api';
import { GroupStudent } from '@/types/student';

export interface GetAllResponse {
  students: GroupStudent[];
  pagination: Pagination;
}
