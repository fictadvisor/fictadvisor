export interface AdminDepartmentSearchFields {
  search: string;
  order: 'desc' | 'asc';
  sort: string;
  divisions: string[];
}
