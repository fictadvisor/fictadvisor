import { GrantSet, GrantSort } from '.';

export interface GrantsSearchFormFields {
  search: string;
  order: 'asc' | 'desc';
  sort: GrantSort;
  set: GrantSet;
}
