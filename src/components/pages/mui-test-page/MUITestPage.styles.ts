import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: {
    mobile: 'mint.100',
    desktop: 'green.200',
  },
  width: '100vw',
  height: '100vh',
};
