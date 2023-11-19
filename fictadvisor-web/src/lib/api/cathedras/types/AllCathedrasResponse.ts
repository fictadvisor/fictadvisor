import { Pagination } from '@/types/api';

export interface AllCathedrasResponse {
  cathedras: Cathedra[];
  pagination: Pagination;
}

export interface Cathedra {
  id: string;
  name: string;
  abbreviation: string;
  teachers: number;
}
