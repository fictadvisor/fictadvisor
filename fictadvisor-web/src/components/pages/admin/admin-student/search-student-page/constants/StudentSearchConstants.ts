import { TagColor } from '@/components/common/ui/tag/types';

export const TagColorMapper: Record<string, TagColor> = {
  CAPTAIN: TagColor.ORANGE,
  MODERATOR: TagColor.PRIMARY,
  STUDENT: TagColor.SUCCESS,
  NULL: TagColor.SECONDARY,
};
export const TagTextMapper: Record<string, string> = {
  CAPTAIN: 'Староста',
  MODERATOR: 'Заст. старости',
  STUDENT: 'Студент',
  NULL: 'Немає',
};
