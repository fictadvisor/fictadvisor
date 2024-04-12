import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  gap: '16px',
  maxWidth: '571px',
  flexDirection: 'row',
};

export const inputLink: SxProps<Theme> = {
  typography: 'body1Medium',
  flex: '1 0 56%',
};

export const input: SxProps<Theme> = {
  flex: '0 0 44%',
  typography: 'body1Medium',
};
