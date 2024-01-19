import { Pagination } from '@/types/api';
import { UserAdmin } from '@/types/user';

export interface GetAllResponse {
  data: UserAdmin[];
  pagination: Pagination;
}
