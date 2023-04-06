import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '25px',
  ul: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  backgroundColor: {
    mobile: 'gray.10',
    desktop: 'gray.10',
  },
  width: '100vw',
  height: '100vh',
};
