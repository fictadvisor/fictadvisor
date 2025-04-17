import { SortQAUParam, State } from '@fictadvisor/utils/enums';

export interface UserSearchFormFields {
  search: string;
  order: 'asc' | 'desc';
  sort: SortQAUParam;
  state: State[];
}

export interface HeaderUserSearchProps {
  onSubmit: (values: Partial<UserSearchFormFields>) => void;
  values: UserSearchFormFields;
}
