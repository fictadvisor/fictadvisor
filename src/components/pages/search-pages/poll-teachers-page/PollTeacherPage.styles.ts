import { SxProps, Theme } from '@mui/material/styles';

export const layout: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '0px 80px 32px 80px',
};

export const pageLoader: SxProps<Theme> = {
  padding: '30px 0',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
};

export const loadBtn: SxProps<Theme> = {
  width: '200px',
  alignSelf: 'center',
};

export const breadcrumps: SxProps<Theme> = {
  margin: '16px 0px 16px 0px',
};
