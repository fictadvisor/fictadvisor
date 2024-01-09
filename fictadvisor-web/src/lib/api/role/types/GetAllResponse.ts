import { Pagination } from '@/types/api';
import { Role } from '@/types/role';

export interface GetAllRolesResponse {
  data: Role[];
  pagination: Pagination;
}
