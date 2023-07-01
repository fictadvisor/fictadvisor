import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export enum TabTextPosition {
  CENTER = 'center',
  LEFT = 'left',
}

export interface TabProps {
  value?: string;
  label?: string | ReactNode;
  count?: number | null;
  icon?: ReactNode | string;
  textPosition?: TabTextPosition;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}
