import { UserGroupRole } from '@/types/user';

export interface UpdateStudentRoleBody {
  roleName: Exclude<UserGroupRole, 'CAPTAIN'>;
}
