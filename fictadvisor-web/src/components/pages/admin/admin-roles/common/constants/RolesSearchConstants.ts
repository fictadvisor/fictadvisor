import { TagColor } from '@/components/common/ui/tag/types';
import { RoleName } from '@/types/role';

export const TagColorMapper: Record<RoleName, TagColor> = {
  [RoleName.USER]: TagColor.ORANGE,
  [RoleName.STUDENT]: TagColor.SUCCESS,
  [RoleName.ADMIN]: TagColor.ERROR,
  [RoleName.CAPTAIN]: TagColor.INDIGO,
  [RoleName.MODERATOR]: TagColor.VIOLET,
};
export const TagTextMapper: Record<RoleName, string> = {
  [RoleName.USER]: 'Користувач',
  [RoleName.STUDENT]: 'Студент',
  [RoleName.ADMIN]: 'Адмін',
  [RoleName.CAPTAIN]: 'Cтароста',
  [RoleName.MODERATOR]: 'Заст. староста',
};
