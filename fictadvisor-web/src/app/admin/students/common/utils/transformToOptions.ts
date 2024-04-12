import { CheckboxesDropdownOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxesDropdown';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { Group } from '@/types/group';
import { UserRemainingSelective } from '@/types/user';

export const transformGroupsMulti = (
  data: Group[],
): CheckboxesDropdownOption[] =>
  data.map(({ code, id }) => ({
    label: code,
    value: id,
  }));

export const transformGroupsDefault = (data: Group[]): DropDownOption[] =>
  data.map(({ code, id }) => ({
    label: code,
    id,
  }));

export const transformSelectives = (
  data: Array<UserRemainingSelective>,
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
