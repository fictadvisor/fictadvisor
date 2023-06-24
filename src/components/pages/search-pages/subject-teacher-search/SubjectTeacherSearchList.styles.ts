import { SxProps, Theme } from '@mui/material/styles';

import typography from '@/styles/theme/constants/typography';

export const wrapper: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '60px',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '16px',
};

export const headText: SxProps<Theme> = {
  maxWidth: {
    tablet: '280px',
    mobile: '200px',
  },
  typography: {
    tablet: typography.h4Bold,
    mobile: typography.h6Bold,
  },
};
