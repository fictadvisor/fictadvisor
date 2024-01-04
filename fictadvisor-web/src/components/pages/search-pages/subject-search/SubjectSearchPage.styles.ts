import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

export const breadcrumbs: SxProps<Theme> = {
  margin: '16px 0px 16px 0px',
};

export const loadBtn: SxProps<Theme> = {
  width: '200px',
  alignSelf: 'center',
};

export const layout: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: {
    mobile: '12px 16px',
    desktop: '0px 80px 32px',
  },
  columnGap: {
    desktop: 'auto',
    mobile: '15px',
  },
  marginBottom: {
    desktop: 'auto',
    mobile: '24px',
  },
};

export const pageLoader: SxProps<Theme> = {
  paddingTop: '30px',
  paddingBottom: '30px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
};
