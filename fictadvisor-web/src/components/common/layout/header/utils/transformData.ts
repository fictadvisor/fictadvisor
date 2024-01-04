import { User, UserGroupRole, UserGroupState } from '@/types/user';

import { TransformedUser } from '../types';

const roleMapper: Record<UserGroupRole, string> = {
  [UserGroupRole.CAPTAIN]: 'Староста',
  [UserGroupRole.MODERATOR]: 'Заст. старости',
  [UserGroupRole.STUDENT]: 'Студент',
};

const transformData = (user?: User): TransformedUser => {
  const name = [user?.lastName, user?.firstName, user?.middleName].join(' ');
  const groupName =
    user?.group?.state === UserGroupState.APPROVED ? user.group.code : null;
  const position = user?.group?.role ? roleMapper[user.group.role] : null;
  const avatar = user?.avatar;

  return { name, groupName, position, avatar };
};

export default transformData;
