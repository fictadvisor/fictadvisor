import { GrantSet } from '../types';
import { GrantsSearchFormFields } from '../types/GrantsSearchFormFields';

export const GrantsInitialValues: GrantsSearchFormFields = {
  search: '',
  order: 'asc',
  sort: 'permission',
  set: '' as GrantSet,
};
