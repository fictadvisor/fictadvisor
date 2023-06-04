import { SxProps, Theme } from '@mui/material';

export const authenticationButtons: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: {
    desktopSemiMedium: 'unset',
    mobile: 'column',
  },
  marginLeft: {
    desktopSemiMedium: '0px',
    mobile: '16px',
  },
  marginRight: {
    desktopSemiMedium: '0px',
    mobile: '16px',
  },
  gap: {
    desktopSemiMedium: '8px',
    mobile: '16px',
  },
};

export const registerButton: SxProps<Theme> = {
  width: '100%',
  maxWidth: {
    desktopSemiMedium: 'unset',
    mobile: '328px',
  },
};

export const loginButton: SxProps<Theme> = {
  width: '100%',
  maxWidth: {
    desktopSemiMedium: 'unset',
    mobile: '328px',
  },
};
