import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  columns: {
    mobile: '1',
    mobileSemiMedium: '2',
    tablet: '3',
    desktop: '4',
  },
};

export const listItem: SxProps<Theme> = {
  marginBottom: '16px',
  breakInside: 'avoid',
};
