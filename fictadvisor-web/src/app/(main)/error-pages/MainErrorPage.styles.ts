'use client';

import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

import theme from '@/styles/theme';

export const errorLayout: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export const errorText: SxProps<Theme> = {
  width: { desktop: '500px', mobile: '300px' },
  textAlign: 'center',
  marginBottom: { desktop: '30px', mobile: '20px' },
  typography: {
    desktop: theme.typography.h3Bold,
    mobile: theme.typography.h5Bold,
  },
};
export const errorMessage: SxProps<Theme> = {
  width: { desktop: '700px', mobile: '300px' },
  height: 'fit-content',
  textAlign: 'center',
  typography: { desktop: theme.typography.h4, mobile: theme.typography.h6 },
};

export const errorContent: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const errorButtons: SxProps<Theme> = {
  alignItems: 'center',
  justifyContent: 'center',
  display: { desktop: 'flex', mobile: 'grid' },
  gap: { desktop: '18px', mobile: '10px' },
  paddingTop: { desktop: '40px', mobile: '32px' },
  marginRight: { mobile: '30px', desktop: '0px' },
  marginLeft: { mobile: '30px', desktop: '0px' },
  paddingBottom: { desktop: '142px', mobile: '177px' },
};

export const button: SxProps<Theme> = {
  maxHeight: '56px',
  whiteSpace: 'nowrap',
  borderRadius: '8px',
  maxWidth: '300px',
};
