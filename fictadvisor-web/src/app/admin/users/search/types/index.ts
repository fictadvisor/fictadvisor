import { UserGroupState } from '@/types/user';

export interface UserSearchFormFields {
  search: string;
  order: 'asc' | 'desc';
  sort: 'username' | 'email';
  state: UserGroupState[];
}

export interface HeaderUserSearchProps {
  onSubmit: (values: Partial<UserSearchFormFields>) => void;
}
