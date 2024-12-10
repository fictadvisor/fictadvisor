import { GroupRoles, State } from '@fictadvisor/utils/enums';

import { User } from '@/types/user';

import { TransformedUser } from '../types';

const roleMapper: Record<string, string> = {
  [GroupRoles.CAPTAIN]: 'Староста',
  [GroupRoles.MODERATOR]: 'Заст. старости',
  [GroupRoles.STUDENT]: 'Студент',
};

export const transformUserData = (user: User): TransformedUser => {
  const name = [user.lastName, user.firstName, user.middleName].join(' ');
  const groupName =
    user.group?.state === State.APPROVED ? user.group.code : null;
  const position = user.group?.role ? roleMapper[user.group.role] : null;
  const avatar = user.avatar;

  return { name, groupName, position, avatar };
};
