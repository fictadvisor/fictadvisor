import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

export const buttonIcons: SxProps<Theme> = {
  position: 'fixed',
  right: '10%',
  bottom: '32px',
  display: 'flex',
  flexDirection: 'column',
  height: '93px',
  justifyContent: 'space-between',
  gap: '10px',
  zIndex: 11,
};
