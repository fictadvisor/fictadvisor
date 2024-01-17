import { UserGroupRole } from '@/types/user';

export interface StudentSearchFormFields {
  search: string;
  sort: 'lastName' | 'firstName' | 'middleName';
  groups: string[];
  roles: UserGroupRole[];
  order: 'asc' | 'desc';
}
