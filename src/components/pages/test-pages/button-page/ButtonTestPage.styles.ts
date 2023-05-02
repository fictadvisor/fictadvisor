import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '25px',
  flexDirection: 'column',
  gap: '8px',
  backgroundColor: {
    mobile: 'grey.0',
    desktop: 'grey.0',
  },
  width: '100vw',
  minHeight: '100vh',
};
