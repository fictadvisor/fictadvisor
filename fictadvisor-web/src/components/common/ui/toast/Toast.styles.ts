import { SxProps, Theme } from '@mui/material/styles';

export const toast = (open: boolean): SxProps<Theme> => ({
  margin: {
    mobile: '15px',
    tablet: '50px',
  },
  ...(!open && {
    display: 'none',
  }),
});
