import { SxProps, Theme } from '@mui/material';

export enum SliderSize {
  MEDIUM = 'medium',
  SMALL = 'small',
}

export interface SliderProps {
  defaultValue?: number;
  size?: SliderSize;
  sx?: SxProps<Theme>;
  onChange?: (event: Event, value: number | number[]) => void;
  value?: number;
}
