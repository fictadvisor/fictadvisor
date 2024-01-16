import { Pagination } from '@/types/api';
import { Grant } from '@/types/role';

export interface GetAllGrantsResponse {
  grants: Grant[];
  pagination: Pagination;
}
