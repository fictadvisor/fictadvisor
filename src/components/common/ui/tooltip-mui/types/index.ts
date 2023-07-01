import { ReactElement } from 'react';
import { SxProps, Theme } from '@mui/material';

export enum TooltipPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

export interface TooltipProps {
  text: string;
  hasArrow?: boolean;
  position?: TooltipPosition;
  children: ReactElement;
  sx?: SxProps<Theme>;
}
