import { SxProps, Theme } from '@mui/material/styles';

import { TextAreaSize } from '@/components/common/ui/form/text-area-mui/types';

export interface TextAreaProps {
  value: string;
  placeholder?: string;
  label?: string;
  size?: TextAreaSize;
  disabled?: boolean;
  showRemark?: boolean;
  rowsNumber?: number;
  touched?: boolean;
  error?: string;
  onChange?: (value: string) => void;
  sx?: SxProps<Theme>;
}
