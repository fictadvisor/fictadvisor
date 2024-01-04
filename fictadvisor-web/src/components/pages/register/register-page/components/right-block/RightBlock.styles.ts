import { SxProps, Theme } from '@mui/material/styles';

export const rightBlock: SxProps<Theme> = {
  display: {
    mobile: 'none',
    desktopSemiMedium: 'flex',
  },
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '50px',
  maxWidth: '400px',
};

export const loginText: SxProps<Theme> = {
  textAlign: 'center',
  fontWeight: '600',
  fontSize: '36px',
  lineHeight: '128%',
};

export const loginButton: SxProps<Theme> = {
  maxWidth: '324px',
  maxHeight: '48px',
  borderRadius: '8px',
};
