import {
  MappedGroupResponse,
  RemainingSelective,
} from '@fictadvisor/utils/responses';

import { CheckboxesDropdownOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxesDropdown';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { UserRemainingSelective } from '@/types/user';

export const transformGroupsMulti = (
  data: MappedGroupResponse[],
): CheckboxesDropdownOption[] =>
  data.map(({ code, id }) => ({
    label: code,
    value: id,
  }));

export const transformGroupsDefault = (
  data: MappedGroupResponse[],
): DropDownOption[] =>
  data.map(({ code, id }) => ({
    label: code,
    id,
  }));

export const transformSelectives = (
  data: Array<RemainingSelective>,
): DropDownOption[] =>
  data.map(({ disciplineId, subjectName }) => ({
    label: subjectName,
    id: disciplineId,
  }));

export const transformSelectivesDefault = (
  data: Array<{ id: string; name: string }>,
): DropDownOption[] => {
  return data.map(({ id, name }) => ({
    label: name,
    id,
  }));
};
