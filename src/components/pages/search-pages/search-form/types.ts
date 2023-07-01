export interface TeacherSearchFormFields {
  search: string;
  order?: 'asc' | 'desc';
  sort?: 'firstName' | 'lastName';
  group?: string;
}

export interface SubjectSearchFormFields {
  search: string;
  order?: 'asc' | 'desc';
  sort?: string;
  group?: string;
}
