import { TeacherRole } from '@fictadvisor/utils/enums';

export interface SearchFormFields {
  search: string;
  order: 'asc' | 'desc';
  sort: string;
  groupId: string;
  roles: TeacherRole[];
  cathedrasId: [];
}
