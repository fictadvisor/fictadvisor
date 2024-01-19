import { UserGroupState } from '@/types/user';

export interface CreateUserBody {
  email: string;
  username: string;
  state: UserGroupState;
}
