import { SxProps, Theme } from '@mui/material/styles';

import { RatingVariant } from '@/components/common/ui/rating-mui/Rating';

export const rating = (variant): SxProps<Theme> => ({
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
