import { SxProps, Theme } from '@mui/material/styles';

export const buttonIcon: SxProps<Theme> = {
  position: 'absolute',
  right: '8px',
  top: '6px',
  zIndex: 1,
  color: 'grey.600',
  '&:hover': {
    color: 'grey.800',
  },
};
