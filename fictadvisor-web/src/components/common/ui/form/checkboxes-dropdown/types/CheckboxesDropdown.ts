import { SxProps, Theme } from '@mui/material';

import { Checkboxes } from '@/store/schedule/useSchedule';

import { FieldSize } from '../../common/types';

import { CheckboxOption } from './CheckboxOption';

export interface CheckboxesDropdownProps {
  options: CheckboxOption[];
  updateCheckboxes: (checkboxes: Checkboxes) => void;
  size?: FieldSize;
  placeholder: string;
  noOptionsText?: string;
  disableClearable?: boolean;
  sx?: SxProps<Theme>;
  inputSx?: SxProps<Theme>;
  dropdownSx?: SxProps<Theme>;
}
