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

export const tableColumn: SxProps<Theme> = {
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'center',
};

export const button: SxProps<Theme> = {
  borderRadius: '8px',
  width: '157px',
};
