import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '36px',
  gap: '18px',
  ul: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  backgroundColor: {
    mobile: '#212121',
    desktop: '#212121',
  },
  width: '100vw',
  minHeight: '100vh',
};
