import { SxProps, Theme } from '@mui/material';

export enum SwitchLabelPlacement {
  START = 'start',
  END = 'end',
}

export interface SwitchProps {
  labelPlacement?: SwitchLabelPlacement;
  sx?: SxProps<Theme>;
  label?: string;
}
