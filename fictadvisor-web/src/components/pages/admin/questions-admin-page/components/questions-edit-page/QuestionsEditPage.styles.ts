import { SxProps, Theme } from '@mui/material/styles';

export const header: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const editName: SxProps<Theme> = {
  width: '656px',
  p: '16px',
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
};

export const name: SxProps<Theme> = {
  typography: 'body1',
  color: '#bbbbbb',
  fontWeight: 500,
};

export const button: SxProps<Theme> = {
  width: '170px',
  height: '48px',
  p: '12px 24px',
  borderRadius: '8px',
};
