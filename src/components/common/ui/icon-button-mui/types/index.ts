import { MouseEventHandler, ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export enum IconButtonColor {
  PRIMARY = 'primary',
  ERROR = 'error',
  SUCCESS = 'success',
  SECONDARY = 'secondary',
  TRANSPARENT = 'transparent',
}

export enum IconButtonSize {
  NORMAL = 'normal',
  LARGE = 'large',
}

export enum IconButtonShape {
  CIRCLE = 'circle',
  SQUARE = 'square',
}

export enum IconButtonState {
  DEFAULT = 'default',
  HOVER = 'hover',
  ACTIVE = 'active',
  FOCUSED = 'focused',
  BORDER = 'border',
}

export interface IconButtonProps {
  size?: IconButtonSize;
  shape?: IconButtonShape;
  color?: IconButtonColor;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
  icon?: ReactNode;
  sx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
}
export type VariantIconButtonProps = Omit<IconButtonProps, 'icon'>;

export enum IconButtonOrder {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

export interface OrderedIconButtonProps extends VariantIconButtonProps {
  order?: IconButtonOrder;
}
