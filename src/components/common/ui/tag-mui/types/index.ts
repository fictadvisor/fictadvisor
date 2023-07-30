import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export enum TagColor {
  PRIMARY = 'primary',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SECONDARY = 'secondary',
  VIOLET = 'violet',
  MINT = 'mint',
  ORANGE = 'orange',
  INDIGO = 'indigo',
}

export enum TagSize {
  MEDIUM = 'medium',
  SMALL = 'small',
}

export enum TagVariant {
  FILL = 'fill',
  OUTLINE = 'outline',
  DARKER = 'darker',
}

export interface TagProps {
  /**
   * Tag content
   */
  text: string;
  /**
   * Optional tag size
   */
  size?: TagSize;
  /**
   * Optional tag color
   */
  color?: TagColor;
  /**
   * Optional tag icon
   */
  variant?: TagVariant;
  /**
   * Optional tag icon
   */
  icon?: ReactNode;
  /**
   * Optional sx styles
   */
  sx?: SxProps<Theme>;
}
