import { UserRemainingSelective } from '@/types/user';

export interface GetSelectiveDisciplinesResponse {
  availableSelectiveAmount: number;
  year: number;
  semester: 1 | 2;
  remainingSelective: UserRemainingSelective[];
}
