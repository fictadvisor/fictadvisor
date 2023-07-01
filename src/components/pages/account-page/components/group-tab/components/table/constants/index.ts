import { UserGroupRole } from '@/types/user';

const roleNamesMapper: Record<UserGroupRole, string> = {
  [UserGroupRole.CAPTAIN]: 'Староста',
  [UserGroupRole.MODERATOR]: 'Зам. старости',
  [UserGroupRole.STUDENT]: 'Студент',
};

export default roleNamesMapper;
