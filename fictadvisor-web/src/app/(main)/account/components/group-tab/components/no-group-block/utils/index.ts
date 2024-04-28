import { MappedGroupResponse } from '@fictadvisor/utils/responses';

import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

export const transformGroups = (
  groups: MappedGroupResponse[],
): DropDownOption[] =>
  groups.map(({ code, id }) => ({
    label: code,
    id,
  }));
