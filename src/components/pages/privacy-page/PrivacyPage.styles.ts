import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';
export const privacyContent: SxProps<Theme> = {
  padding: {
    desktopLarge: '3% 20% 4% 13%',
    mobileMedium: '8%',
  },
};

export const privacyList: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
};

export const paragraph: SxProps<Theme> = {
  typography: theme.typography.body1,
};
