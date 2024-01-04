import { SxProps, Theme } from '@mui/material/styles';

export const breadcrumbs: SxProps<Theme> = {
  margin: '16px 0px 16px 0px',
};

export const layout: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: {
    mobile: '0px 16px 32px',
    desktopSemiMedium: '0px 80px 32px',
  },
};

export const pageLoader: SxProps<Theme> = {
  paddingTop: '30px',
  paddingBottom: '30px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
};
