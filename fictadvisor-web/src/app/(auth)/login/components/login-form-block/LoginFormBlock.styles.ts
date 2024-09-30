'use client';

import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const loginFormBlock: SxProps<Theme> = {
  width: '480px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

export const loginHeader: SxProps<Theme> = {
  textAlign: 'center',

  [theme.breakpoints.down('desktopSemiMedium')]: {
    display: 'none',
  },
};

export const divider: SxProps<Theme> = {
  width: '100%',
  '&::before, &::after': {
    borderColor: theme.palette.grey[800],
  },
};
