export type GrantSet = 'given' | 'taken';

export type GrantSort = 'permission' | 'weight' | 'set';

export interface GrantsSearchFormFields {
  search: string;
  order: 'asc' | 'desc';
  sort: GrantSort;
  set: GrantSet;
}
