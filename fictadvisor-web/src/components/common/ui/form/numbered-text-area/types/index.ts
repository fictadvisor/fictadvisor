import { SxProps, Theme } from '@mui/material/styles';

export interface NumberedTextAreaProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  showRemark?: boolean;
  sx?: SxProps<Theme>;
  touched?: boolean;
  error?: string;
  onChange?: (value: string) => void;
}
