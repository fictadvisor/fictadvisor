import { GroupRoles } from '@fictadvisor/utils/enums';

const roleNamesMapper: Record<string, string> = {
  [GroupRoles.CAPTAIN]: 'Староста',
  [GroupRoles.MODERATOR]: 'Заст. старости',
  [GroupRoles.STUDENT]: 'Студент',
};

export default roleNamesMapper;
