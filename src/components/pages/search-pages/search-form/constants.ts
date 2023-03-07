import { SubjectSearchFormFields, TeacherSearchFormFields } from './types';

export const TeacherInitialValues: TeacherSearchFormFields = {
  search: '',
  order: 'asc',
  sort: 'lastName',
  group: '',
};

export const SubjectInitialValues: SubjectSearchFormFields = {
  search: '',
  order: 'asc',
  sort: 'name',
  group: '',
};
