import { SxProps, Theme } from '@mui/material/styles';

export const searchList: SxProps<Theme> = {
  marginTop: { mobileMedium: '40px', desktopLarge: '50px' },
  marginBottom: '16px',
  display: 'grid',
  gridTemplateColumns: {
    mobile: 'repeat(4, 1fr)',
    tablet: 'repeat(2, 1fr)',
    desktop: 'repeat(3, 1fr)',
  },
  columnGap: { mobile: '48px', tablet: '16px', desktop: '32px' },
  rowGap: '4rem',
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
  typography: {
    tablet: 'h4Bold',
    mobile: 'h6Bold',
  },
};
