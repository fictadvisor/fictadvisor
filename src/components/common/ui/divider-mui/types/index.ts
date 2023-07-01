import { SxProps, Theme } from '@mui/material/styles';

export enum DividerTextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

export interface DividerProps {
  text?: string;
  textAlign?: DividerTextAlign;
  sx?: SxProps<Theme>;
}
