import { AutocompleteProps } from '@mui/material';

import { FieldSize } from '../../common/types';

type TCheckboxesAutocomplete<T> = Omit<
  AutocompleteProps<T, true, undefined, undefined>,
  'size' | 'renderInput'
>;

export interface CheckboxesDropdownProps<T> extends TCheckboxesAutocomplete<T> {
  placeholder?: string;
  size?: FieldSize;
  inputSx?: Record<string, string | object>;
  dropdownSx?: Record<string, string | object>;
}
