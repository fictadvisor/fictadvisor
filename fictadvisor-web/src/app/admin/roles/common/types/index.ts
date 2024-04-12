import { RoleName } from '@/types/role';

export interface RolesSearchFormFields {
  search: string;
  order: 'asc' | 'desc';
  sort: RolesSort;
  name: RoleName;
}

export interface HeaderRolesSearchProps {
  onSubmit: (values: Partial<RolesSearchFormFields>) => void;
}

export type RolesSort = 'displayName' | 'weight' | 'createdAt' | 'id';
