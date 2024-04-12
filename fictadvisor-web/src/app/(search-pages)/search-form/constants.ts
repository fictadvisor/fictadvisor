import { SearchFormFields } from './types';

export const TeacherInitialValues: SearchFormFields = {
  search: '',
  order: 'asc',
  sort: 'lastName',
  groupId: '',
  roles: [],
  cathedrasId: [],
};

export const SubjectInitialValues: SearchFormFields = {
  search: '',
  order: 'asc',
  sort: 'name',
  groupId: '',
  roles: [],
  cathedrasId: [],
};
