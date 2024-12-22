import { SortQASParam, SortQATParam } from '@fictadvisor/utils/enums';

import { SearchFormFields } from './types';

export const TeacherInitialValues: SearchFormFields = {
  search: '',
  order: 'asc',
  sort: SortQATParam.LAST_NAME,
  groupId: '',
  disciplineTypes: [],
  cathedrasId: [],
};

export const SubjectInitialValues: Partial<SearchFormFields> = {
  search: '',
  order: 'asc',
  sort: SortQASParam.NAME,
  groupId: '',
};
