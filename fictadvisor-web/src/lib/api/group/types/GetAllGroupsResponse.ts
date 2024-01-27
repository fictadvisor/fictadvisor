import { Pagination } from '@/types/api';
import { Group } from '@/types/group';

export interface GetAllGroupsResponse {
  groups: Group[];
  pagination: Pagination;
}
