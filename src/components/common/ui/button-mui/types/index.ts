import { MouseEventHandler, ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export enum ButtonColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum ButtonSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
}

export enum ButtonVariant {
  FILLED = 'filled',
  OUTLINE = 'outline',
  TEXT = 'text',
}

export enum ButtonState {
  DEFAULT = 'default',
  HOVER = 'hover',
  ACTIVE = 'active',
  FOCUSED = 'focused',
  DISABLED = 'disabled',
}

export interface ButtonColorsStruct {
  backgroundColor: string[];
  borderColor: string[];
  textColorDisabled: string;
}

export type ButtonColorsMap = Record<
  Exclude<ButtonVariant, ButtonVariant.TEXT>,
  Record<ButtonColor, ButtonColorsStruct>
>;

export interface ButtonProps {
  text?: string;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
  type?: 'button' | 'reset' | 'submit';
}
