import { SortQASParam, SortQATParam } from '@fictadvisor/utils/enums';

import { SearchFormFields } from './types';

export const TeacherInitialValues: SearchFormFields = {
  search: '',
  order: 'asc',
  sort: SortQATParam.LAST_NAME,
  disciplineTypes: [],
  cathedrasId: [],
};

export const SubjectInitialValues: SearchFormFields = {
  search: '',
  order: 'asc',
  sort: SortQASParam.NAME,
  disciplineTypes: [],
  cathedrasId: [],
};
