import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

export const progress: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const group: SxProps<Theme> = {
  pb: '20px',
};

export const sortButton: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  mb: '20px',
};
