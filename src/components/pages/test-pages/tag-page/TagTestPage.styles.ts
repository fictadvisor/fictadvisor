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
    mobile: 'gray.10',
    desktop: 'gray.10',
  },
  width: '100vw',
  minHeight: '100vh',
};
