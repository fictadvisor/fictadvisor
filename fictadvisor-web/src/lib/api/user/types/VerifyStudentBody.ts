import { UserGroupState } from '@/types/user';

export interface VerifyStudentBody {
  state: UserGroupState;
  isCaptain: boolean;
}
