import { SxProps, Theme } from '@mui/material/styles';

export const registerPage: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 30px',

  backgroundSize: {
    mobile: '1200px 100%',
    desktopSemiMedium: '100% 100%',
  },
};

export const registerContent: SxProps<Theme> = {
  zIndex: '1',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-around',

  maxWidth: {
    mobile: '480px',
    desktopSemiMedium: '1200px',
  },

  alignItems: {
    mobile: 'flex-start',
    desktopSemiMedium: 'center',
  },
};

export const divider: SxProps<Theme> = {
  borderTopWidth: '635px',
  width: '1px',
  display: {
    mobile: 'none',
    desktopSemiMedium: 'block',
  },
};
