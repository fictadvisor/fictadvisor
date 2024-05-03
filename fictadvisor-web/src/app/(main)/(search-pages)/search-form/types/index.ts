import { TeacherRole } from '@/types/teacher';

export interface SearchFormFields {
  search: string;
  order: 'asc' | 'desc';
  sort: string;
  groupId: string;
  roles: TeacherRole[];
  cathedrasId: [];
}
