import { SxProps, Theme } from '@mui/material/styles';

export const headItem: SxProps<Theme> = {
  typography: 'body1Bold',
  color: 'white.main',
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
};

export const bodyItem: SxProps<Theme> = {
  typography: 'body1Medium',
  color: 'white.main',
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
};

export const tag: SxProps<Theme> = {
  typography: 'body1Medium',
  color: 'white.main',
};

export const buttonSection: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'right',
};

export const button: SxProps<Theme> = {
  width: 'fit-content',
  whiteSpace: 'nowrap',
  borderRadius: '8px',
  marginX: '10px',
};
