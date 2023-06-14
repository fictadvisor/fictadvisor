import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '35px',
  ul: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  backgroundColor: {
    mobile: 'gray.100',
    desktop: 'gray.100',
  },
  width: '100vw',
  height: '100vh',
};
