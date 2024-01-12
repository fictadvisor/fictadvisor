import { AutocompleteProps } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import { FieldSize } from '../../common/types';

export interface CheckboxesDropdownOption {
  label: string;
  value: string;
  id?: string;
}

type TCheckboxesAutocomplete = Omit<
  AutocompleteProps<CheckboxesDropdownOption, true, undefined, undefined>,
  'size' | 'renderInput' | 'label'
>;

export interface CheckboxesDropdownProps extends TCheckboxesAutocomplete {
  placeholder?: string;
  label?: string;
  size?: FieldSize;
  inputSx?: SxProps<Theme>;
  dropdownSx?: SxProps<Theme>;
}
