import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

import theme from '@/styles/theme';

export const formContainer: SxProps<Theme> = {
  width: { mobile: '100%', desktop: '440px' },
  // minWidth: '400px',
  [theme.breakpoints.down('mobile')]: { width: '100%', minWidth: '0' },
};
export const input: SxProps<Theme> = {
  marginTop: '18px',
};
export const confirmButton: SxProps<Theme> = {
  width: { mobile: '60%', desktop: 'fit-content' },
  margin: '32px 0 34px 0',
  [theme.breakpoints.down('desktopSemiMedium')]: {
    display: 'block',
  },
};
export const changePasswordButton: SxProps<Theme> = {
  typography: theme.typography.body2,
  width: '100%',
  [theme.breakpoints.down('desktopSemiMedium')]: {
    typography: theme.typography.body1,
    width: '200px',
  },
};
