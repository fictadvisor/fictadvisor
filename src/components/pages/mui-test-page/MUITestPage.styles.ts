import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: {
    md: '100vh',
    xl: '50vh',
  },
  backgroundColor: 'gray.100',
};
