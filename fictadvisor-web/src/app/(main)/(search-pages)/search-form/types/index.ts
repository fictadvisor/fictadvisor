import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';

export interface SearchFormFields {
  search: string;
  order: 'asc' | 'desc';
  sort: string;
  groupId?: string;
  disciplineTypes: DisciplineTypeEnum[];
  cathedrasId: [];
}
