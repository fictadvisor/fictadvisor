import { Pagination } from '@/types/api';
import { Teacher } from '@/types/teacher';

export interface AllCathedrasResponse {
  cathedras: Cathedra[];
  pagination: Pagination;
}

export interface Cathedra {
  id: string;
  name: string;
  abbreviation: string;
  teachers: number;
  division: string;
}

export interface DivisionsResponse {
  divisions: string[];
}

export interface CathedraTeachersResponse {
  teachers: Teacher[];
  pagination: Pagination;
}
