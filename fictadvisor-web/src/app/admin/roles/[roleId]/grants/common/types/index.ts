import { QueryAllGrantsDTO } from '@fictadvisor/utils/requests';

export type GrantSet = 'given' | 'taken';

export interface GrantsSearchFormFields extends Omit<QueryAllGrantsDTO, 'set'> {
  set: GrantSet;
}
