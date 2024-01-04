import { SxProps, Theme } from '@mui/material/styles';

export const lineNumbers: SxProps<Theme> = {
  marginTop: '9px',
  textAlign: 'center',
  width: '30px',
  display: 'flex',
  flexDirection: 'column',
  typography: 'body1',
  lineHeight: '24px',
  overflow: 'hidden',
  color: 'inherit',
  height: {
    mobile: '168px',
    mobileMedium: '240px',
  },
};
