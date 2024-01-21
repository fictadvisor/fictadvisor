import { Pagination } from '@/types/api';
import { Subject } from '@/types/subject';

export interface GetListOfSubjectsResponse {
  subjects: Subject[];
  pagination?: Pagination;
}
