import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

export const formWrapper: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
};
export const buttonPanel: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '40px',
};
export const button: SxProps<Theme> = {
  maxWidth: '240px',
};
