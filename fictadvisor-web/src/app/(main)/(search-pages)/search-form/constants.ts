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

// Search results are kept around long enough to survive a trip to a teacher /
// subject page and back: coming back must not re-request every page the user had
// already loaded, it must render the list exactly as they left it.
export const SEARCH_LIST_QUERY_OPTIONS = {
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
} as const;
