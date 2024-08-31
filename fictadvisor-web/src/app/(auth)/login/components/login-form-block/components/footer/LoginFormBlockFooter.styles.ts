'use client';

import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const registerMobileButton: SxProps<Theme> = {
  width: 'fit-content',
  display: 'none',
  borderRadius: '6px',
  padding: '8px 16px',

  [theme.breakpoints.down('desktopSemiMedium')]: {
    display: 'flex',
  },
};

export const comebackButton: SxProps<Theme> = {
  marginTop: '26px',
  marginBottom: '40px',
  typography: theme.typography.body1Bold,
  gap: '10px',

  [theme.breakpoints.down('mobileMedium')]: {
    marginTop: '16px',
  },
};

export const narrowScreenText: SxProps<Theme> = {
  display: 'none',
  margin: '22px 0 14px 0',
  typography: theme.typography.body2Medium,
  color: theme.palette.grey[600],

  [theme.breakpoints.down('desktopSemiMedium')]: {
    display: 'flex',
  },
};
