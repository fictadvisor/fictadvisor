import { Pagination } from '@/types/api';
import { Teacher } from '@/types/teacher';

export interface CathedraTeachersResponse {
  teachers: Teacher[];
  pagination: Pagination;
}
