import { Pagination } from '@/types/api';
import { Cathedra } from '@/types/cathedra';
import { Teacher } from '@/types/teacher';

export interface AllCathedrasResponse {
  cathedras: Cathedra[];
  pagination: Pagination;
}

export interface DivisionsResponse {
  divisions: string[];
}

export interface CathedraTeachersResponse {
  teachers: Teacher[];
  pagination: Pagination;
}
