import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

export const mainWrapper: SxProps<Theme> = {
  width: '325px',
  height: 'min(80vh)',
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'center',
  gap: '16px',
};
export const sticky: SxProps<Theme> = {
  position: 'sticky',
  top: '80px',
  alignItems: 'center',
  mb: '16px',
};

export const wrapper: SxProps<Theme> = {
  gap: '8px',
  alignItems: 'center',
};
