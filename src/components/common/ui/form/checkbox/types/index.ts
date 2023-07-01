import { SxProps, Theme } from '@mui/material/styles';

export enum CheckboxColor {
  PRIMARY = 'primary',
  ERROR = 'error',
  LECTURE = 'lecture',
  PRACTICE = 'practice',
  LAB = 'lab',
  EVENT = 'event',
}

export enum CheckboxTextType {
  BODY1 = 'body1',
  BODY2MEDIUM = 'body2Medium',
}

export interface CheckboxProps {
  label?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  name: string;
  color?: CheckboxColor;
  textType?: CheckboxTextType;
}
