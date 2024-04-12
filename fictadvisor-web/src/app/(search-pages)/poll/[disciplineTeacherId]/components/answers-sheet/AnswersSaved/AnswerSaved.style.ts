import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const savedWrapper: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
  paddingTop: '184px',

  [theme.breakpoints.down('desktopMedium')]: {
    paddingTop: '160px',
  },

  [theme.breakpoints.down('desktopSemiMedium')]: {
    paddingTop: '140px',
  },

  [theme.breakpoints.down('desktop')]: {
    padding: '120px 16px 16px',
  },
};

export const content: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '900px',
  [theme.breakpoints.down('desktop')]: {
    maxWidth: '600px',
  },

  [theme.breakpoints.down('tablet')]: {
    maxWidth: '400px',
  },
};

export const heading: SxProps<Theme> = {
  textAlign: 'center',
  paddingTop: '20px',
  paddingBottom: '12px',
  typography: 'h3SemiBold',
  [theme.breakpoints.down('mobileMedium')]: {
    typography: 'h4Bold',
  },
};

export const paragraph: SxProps<Theme> = {
  textAlign: 'center',
  paddingBottom: '36px',
  typography: 'h6Medium',
  [theme.breakpoints.down('mobileMedium')]: {
    typography: 'body1Medium',
  },
};

export const buttons: SxProps<Theme> = {
  display: 'flex',
  gap: '30px',
  width: '100%',
  justifyContent: 'center',
  [theme.breakpoints.down('desktop')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export const button: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  height: '48px',
  borderRadius: '8px',
  width: '308px',
  [theme.breakpoints.down('desktop')]: {
    width: '100%',
  },

  [theme.breakpoints.down('tablet')]: {
    width: '328px',
  },

  [theme.breakpoints.down('mobileSemiMedium')]: {
    width: '100%',
  },
};
