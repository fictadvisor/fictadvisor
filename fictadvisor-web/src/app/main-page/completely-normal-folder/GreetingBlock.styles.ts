import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const greetingWrapper: SxProps<Theme> = {
  paddingTop: '100px',
};

export const greetingTitle: SxProps<Theme> = {
  textAlign: 'center',
  typography: theme.typography.h3SemiBold,
  [theme.breakpoints.down('tablet')]: {
    typography: theme.typography.h6,
  },
};

export const greetingSubtitle: SxProps<Theme> = {
  textAlign: 'center',
  typography: theme.typography.h5,
  [theme.breakpoints.down('tablet')]: {
    typography: theme.typography.body1,
  },
};

export const kittensBlock: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  maxWidth: '1300px',
  padding: '14px 0',
  margin: '0 auto',
};

export const kittenCard: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '14px 8px',
};

export const kittenName: SxProps<Theme> = {
  typography: theme.typography.h5,
  paddingTop: '12px',
  [theme.breakpoints.down('tablet')]: {
    typography: theme.typography.body2Medium,
  },
};

export const kittenTag: SxProps<Theme> = {
  paddingTop: '4px',
  typography: theme.typography.body1,
  [theme.breakpoints.down('tablet')]: {
    typography: theme.typography.body1,
  },
};
