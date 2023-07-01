import { SxProps, Theme } from '@mui/material/styles';

export enum TextAreaSize {
  MEDIUM = 'medium',
  SMALL = 'small',
}

export enum TextAreaState {
  DEFAULT = 'default',
  ERROR = 'error',
}

export interface TextAreaProps {
  name: string;
  placeholder?: string;
  label?: string;
  size?: TextAreaSize;
  disabled?: boolean;
  showRemark?: boolean;
  rowsNumber?: number;
  sx?: SxProps<Theme>;
}
