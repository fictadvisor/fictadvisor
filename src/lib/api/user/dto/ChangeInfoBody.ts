export interface ChangeInfoBody {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  groupId?: string;
  state?: 'APPROVED' | 'PENDING' | 'DECLINED';
}
