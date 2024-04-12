import { SxProps, Theme } from '@mui/material/styles';

export const filler = (width: string): SxProps<Theme> => ({
  width: width,
  height: '0',
});
