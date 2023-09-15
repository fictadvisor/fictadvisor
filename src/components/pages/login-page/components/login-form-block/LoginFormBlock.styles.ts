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

export const telegramButton: SxProps<Theme> = {
  margin: '32px 0',
  borderRadius: '8px',
  gap: '10px',

  [theme.breakpoints.down('mobileMedium')]: {
    typography: theme.typography.body2Bold,
    padding: '16px 8px',
  },
};

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

export const divider: SxProps<Theme> = {
  width: '100%',
  '&::before, &::after': {
    borderColor: theme.palette.grey[800],
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
