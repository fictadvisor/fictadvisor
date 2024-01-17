import { UserGroupRole } from '@/types/user';

export interface StudentEdit {
  firstName: string;
  middleName: string | undefined;
  lastName: string;
  roleName: UserGroupRole;
  groupId: string;
}
