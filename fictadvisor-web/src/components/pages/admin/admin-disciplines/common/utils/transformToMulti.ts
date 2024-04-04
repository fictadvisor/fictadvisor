import { CheckboxesDropdownOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxesDropdown';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

export const transferToMulti = (
  options: DropDownOption[],
): CheckboxesDropdownOption[] => {
  return options.map(
    option =>
      ({
        ...option,
        value: option.id,
      }) as unknown as CheckboxesDropdownOption,
  );
};
