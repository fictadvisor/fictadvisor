import { UserGroupRole } from '@/types/user';

export interface CreateStudentBody {
  firstName: string;
  middleName: string;
  username: string;
  lastName: string;
  roleName: UserGroupRole;
  groupId: string;
}
