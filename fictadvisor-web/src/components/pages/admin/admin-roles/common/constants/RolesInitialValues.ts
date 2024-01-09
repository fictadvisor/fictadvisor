import { RoleName } from '@/types/role';

import { RolesSearchFormFields } from '../types/HeaderRolesSearch';

export const RolesInitialValues: RolesSearchFormFields = {
  search: '',
  order: 'asc',
  sort: 'displayName',
  name: '' as RoleName,
};
