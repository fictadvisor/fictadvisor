export interface searchFormFields {
  search: string;
  order?: 'asc' | 'desc';
  sort?: 'firstName' | 'lastName';
  group?: string;
}
