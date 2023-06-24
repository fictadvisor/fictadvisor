import { SxProps, Theme } from '@mui/material/styles';

import typography from '@/styles/theme/constants/typography';

export const wrapper: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
};
export const content: SxProps<Theme> = {
  maxWidth: '600px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '16px',
};

export const headText: SxProps<Theme> = {
  typography: {
    tablet: typography.h4Bold,
    mobile: typography.h6Bold,
  },
};
