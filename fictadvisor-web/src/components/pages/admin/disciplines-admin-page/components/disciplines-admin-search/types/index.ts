export interface DisciplinesAdminSearchFormFields {
  search: string;
  order: 'desc' | 'asc';
  sort: 'name' | 'semester' | 'group';
  groups: string[];
  semesters: Semester[];
  teachers: string[];
}

interface Semester {
  year: number;
  semester: number;
}
