'use client';

import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const telegramButton: SxProps<Theme> = {
  margin: '32px 0',
  borderRadius: '8px',
  gap: '10px',

  [theme.breakpoints.down('mobileMedium')]: {
    typography: theme.typography.body2Bold,
    padding: '16px 8px',
  },
};
