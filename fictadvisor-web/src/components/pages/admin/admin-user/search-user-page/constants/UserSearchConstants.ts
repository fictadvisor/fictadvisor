import { TagColor } from '@/components/common/ui/tag/types';

export const TagColorMapper: Record<string, TagColor> = {
  PENDING: TagColor.ORANGE,
  APPROVED: TagColor.SUCCESS,
  DECLINED: TagColor.ERROR,
};
export const TagTextMapper: Record<string, string> = {
  PENDING: 'В очікуванні',
  APPROVED: 'Верифікований',
  DECLINED: 'Не верифікований',
};
