import { MouseEventHandler, ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export enum AlertButtonVariant {
  ERROR_FILL = 'error_fill',
  ERROR_OUTLINE = 'error_outline',
  SUCCESS = 'success',
}

export enum AlertButtonState {
  DEFAULT = 'default',
  HOVER = 'hover',
  ACTIVE = 'active',
  FOCUS = 'focus',
  DISABLED = 'disabled',
}

export interface AlertButtonProps {
  text?: string;
  variant?: AlertButtonVariant;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
}
