import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const loginPage: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
  minWidth: '335px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundSize: '100% 100%',
  padding: '0 15px',
};

export const loginPageContent: SxProps<Theme> = {
  zIndex: 1,
  display: 'flex',
  width: '100%',
  minHeight: '635px',
  maxWidth: '1200px',
  justifyContent: 'space-around',

  [theme.breakpoints.down('desktopSemiMedium')]: {
    maxWidth: '480px',
    alignItems: 'flex-start',
  },
};

export const divider: SxProps<Theme> = {
  height: 'inherit',
  width: '2px',
  borderColor: theme.palette.grey[800],

  [theme.breakpoints.down('desktopSemiMedium')]: {
    display: 'none',
  },
};
