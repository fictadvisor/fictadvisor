import { SxProps, Theme } from '@mui/material/styles';

export const searchList: SxProps<Theme> = {
  marginTop: {
    mobile: '30px',
    mobileMedium: '40px',
    desktopLarge: '50px',
  },
  marginBottom: '16px',
  display: 'grid',
  gridTemplateColumns: {
    mobile: 'repeat(1, 1fr)',
    mobileMedium: 'repeat(2, 1fr)',
    tablet: 'repeat(3, 1fr)',
    desktop: 'repeat(4, 1fr)',
  },
  columnGap: {
    mobile: '16px',
    tablet: '24px',
    desktop: '32px',
  },
  rowGap: {
    mobile: '1rem',
    tablet: '3rem',
    desktop: '4rem',
  },
  gridAutoRows: 'max-content !important',
  alignItems: 'center',
};

export const wrapper: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
};
export const content: SxProps<Theme> = {
  maxWidth: '600px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '16px',
};

export const headText: SxProps<Theme> = {
  marginBottom: {
    desctop: '48px',
    tablet: '32px',
    mobile: '16px',
  },
  typography: {
    tablet: 'h4Bold',
    mobile: 'h6Bold',
  },
};
