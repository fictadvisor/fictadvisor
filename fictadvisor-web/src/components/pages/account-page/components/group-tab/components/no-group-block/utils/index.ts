import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { Group } from '@/types/group';

export const transformGroups = (groups: Group[]): DropDownOption[] =>
  groups.map(({ code, id }) => ({
    label: code,
    id,
  }));
