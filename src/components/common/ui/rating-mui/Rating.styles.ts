import { SxProps, Theme } from '@mui/material/styles';

import { RatingVariant } from './types';

export const rating = (variant: RatingVariant): SxProps<Theme> => ({
  width: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...(variant === RatingVariant.SHORT && { gap: '4px' }),
  ...(variant === RatingVariant.LONG && { gap: '8px' }),
  typography: 'body1Bold',
});

export const ratingStars: SxProps<Theme> = {
  paddingBottom: '4px',
};
