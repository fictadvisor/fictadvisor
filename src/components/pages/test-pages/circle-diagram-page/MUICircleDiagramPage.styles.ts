import { SxProps, Theme } from '@mui/material/styles';

export const forContainer: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
};

export const forBox: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
  mt: 20,
};
