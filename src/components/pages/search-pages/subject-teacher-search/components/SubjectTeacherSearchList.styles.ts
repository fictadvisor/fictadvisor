import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '60px',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '16px',
};

export const headText: SxProps<Theme> = {
  maxWidth: {
    tablet: '280px',
    mobile: '200px',
  },
  typography: {
    tablet: 'h4Bold',
    mobile: 'h6Bold',
  },
};
