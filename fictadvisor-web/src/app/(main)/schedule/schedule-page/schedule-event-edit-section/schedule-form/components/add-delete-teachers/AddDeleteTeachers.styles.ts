import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

export const actions: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const btn: SxProps<Theme> = {
  '&:focus': { borderColor: 'transparent' },
  width: 'fit-content',
  p: '6px',
  gap: '8px',
};

export const redBtn: SxProps<Theme> = {
  ...btn,
  color: 'error.500',
  '&:hover,&:focus': {
    color: 'error.600',
  },
};

export const container: SxProps<Theme> = {
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: '8px',
};

export const errorRemark: SxProps<Theme> = {
  fontSize: '11px',
  pl: '12px',
  color: 'error.500',
};
