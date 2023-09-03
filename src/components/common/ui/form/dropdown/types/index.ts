import { ReactNode } from 'react';
import { Autocomplete } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import { FieldSize } from '@/components/common/ui/form/common/types';
import { TagProps } from '@/components/common/ui/tag/types';

interface OptionBase {
  id: string;
}
interface DropDownTextOption extends OptionBase {
  label: string;
}

interface DropDownTagOption extends OptionBase, TagProps {}

export type DropDownOption = DropDownTagOption | DropDownTextOption;

export interface DropdownProps {
  options: DropDownOption[];
  label?: string;
  isDisabled?: boolean;
  placeholder?: string;
  isSuccessOnDefault?: boolean;
  defaultRemark?: string;
  showRemark?: boolean;
  size?: FieldSize;
  noOptionsText?: string;
  width?: string;
  disableClearable?: boolean;
  value: string;
  onChange: (value: string) => void;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  touched?: boolean;
  error?: string;
  icon?: ReactNode;
  hasPopup?: boolean;
  inputSx?: SxProps<Theme>;
  dropdownSx?: SxProps<Theme>;
}
