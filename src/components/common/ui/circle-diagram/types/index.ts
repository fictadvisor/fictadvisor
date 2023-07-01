import { SxProps, Theme } from '@mui/material/styles';

export enum CircleDiagramVariant {
  DETERMINATE = 'determinate',
  INDETERMINATE = 'indeterminate',
}

export interface CircleDiagramProps {
  value: number;
  variant?: CircleDiagramVariant;
  sx?: SxProps<Theme>;
  thickness?: number;
}
