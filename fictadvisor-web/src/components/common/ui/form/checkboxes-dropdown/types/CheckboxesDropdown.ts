import { ReactNode } from 'react';
import { SelectChangeEvent, SelectProps } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import { FieldSize } from '../../common/types';

export interface CheckboxesDropdownOption {
  label: string;
  value: string;
  id?: string;
}

export interface CheckboxesDropdownProps
  extends Omit<SelectProps, 'size' | 'renderValue'> {
  values: CheckboxesDropdownOption[];
  selected: CheckboxesDropdownOption[];
  handleChange: (event: SelectChangeEvent, child: ReactNode) => void;
  width?: number;
  label?: string;
  size?: FieldSize;
  inputSx?: SxProps<Theme>;
  dropdownSx?: SxProps<Theme>;
  menuSx?: SxProps<Theme>;
}
