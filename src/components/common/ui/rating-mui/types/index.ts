import { SxProps, Theme } from '@mui/material';

export enum RatingVariant {
  LONG = 'long',
  SHORT = 'short',
}

export interface RatingProps {
  rating: number;
  variant?: RatingVariant;
  sx?: SxProps<Theme>;
}
