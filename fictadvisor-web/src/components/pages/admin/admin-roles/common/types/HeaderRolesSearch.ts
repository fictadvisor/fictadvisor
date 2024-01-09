import { RoleName } from '@/types/role';

export interface RolesSearchFormFields {
  search: string;
  order: 'asc' | 'desc';
  sort: 'displayName' | 'weight' | 'createdAt' | 'id';
  name: RoleName;
}

export interface HeaderRolesSearchProps {
  onSubmit: (values: Partial<RolesSearchFormFields>) => void;
}
