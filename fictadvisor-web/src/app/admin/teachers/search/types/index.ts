export interface AdminSearchFormFields {
  search: string;
  order: 'desc' | 'asc';
  sort: string;
  cathedrasId: string[];
  roles: string[];
}
