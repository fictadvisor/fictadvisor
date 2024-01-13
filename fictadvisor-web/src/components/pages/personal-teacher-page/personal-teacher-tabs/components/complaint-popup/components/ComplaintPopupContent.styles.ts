import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  columns: {
    mobile: '1',
    mobileSemiMedium: '2',
    tablet: '3',
    desktop: '4',
  },
};

export const subtitleWrapper: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  marginBottom: '18px',
};

export const subtitle: SxProps<Theme> = {
  typography: 'body1Medium',
  maxWidth: '502px',
};

export const inputsWrapper: SxProps<Theme> = {
  maxWidth: '480px',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'start',
  marginBottom: '-20px',
};
