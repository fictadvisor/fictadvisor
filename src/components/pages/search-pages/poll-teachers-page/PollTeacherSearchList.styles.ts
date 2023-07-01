import { SxProps, Theme } from '@mui/material/styles';

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
