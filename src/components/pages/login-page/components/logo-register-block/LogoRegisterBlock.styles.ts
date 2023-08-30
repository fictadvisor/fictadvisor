import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const logoRegisterBlock: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '50px',
  maxWidth: '400px',

  [theme.breakpoints.down('desktopSemiMedium')]: {
    display: 'none',
  },
};

export const registerText: SxProps<Theme> = {
  textAlign: 'center',
};

export const registerButton: SxProps<Theme> = {
  maxWidth: '300px',
  borderRadius: '8px',
};
