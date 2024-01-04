import { UserGroupState } from '@/types/user';

export interface VerifySuperheroBody {
  dorm: boolean;
  state: UserGroupState;
}
