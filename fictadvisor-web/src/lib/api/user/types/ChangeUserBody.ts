import { UserGroupState } from '@/types/user';

export interface ChangeUserBody {
  email?: string;
  username?: string;
  state?: UserGroupState;
}
