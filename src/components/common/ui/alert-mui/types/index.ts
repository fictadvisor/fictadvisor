import { SxProps, Theme } from '@mui/material/styles';

export enum AlertType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
}

export enum AlertVariant {
  FILLED = 'filled',
  DARKER = 'darker',
  OUTLINED = 'outlined',
  BORDER_LEFT = 'border-left',
  BORDER_TOP = 'border-top',
}

export interface AlertProps {
  title: string;
  type?: AlertType;
  description?: string;
  variant?: AlertVariant;
  onClose?: () => void;
  sx?: SxProps<Theme>;
}
