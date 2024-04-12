import { UserGroupRole } from '@/types/user';

export interface StudentCreate {
  firstName: string;
  middleName: string;
  username: string;
  lastName: string;
  roleName: UserGroupRole;
  groupId: string;
}

export interface StudentEdit {
  firstName: string;
  middleName: string | undefined;
  lastName: string;
  roleName: UserGroupRole;
  groupId: string;
}

export interface StudentSearchFormFields {
  search: string;
  sort: 'lastName' | 'firstName' | 'middleName';
  groups: string[];
  roles: UserGroupRole[];
  order: 'asc' | 'desc';
}
