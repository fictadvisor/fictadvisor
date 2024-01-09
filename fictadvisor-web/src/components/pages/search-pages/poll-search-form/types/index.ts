import { TeacherRole } from '@/types/teacher';

export interface PollSearchFormFields {
  search: string;
  roles: TeacherRole[];
  order: 'asc' | 'desc';
  sort: string;
}
