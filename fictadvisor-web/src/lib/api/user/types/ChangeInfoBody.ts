import { UserGroupState } from '@/types/user';

export interface ChangeInfoBody {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  groupId?: string;
  state?: UserGroupState;
}
