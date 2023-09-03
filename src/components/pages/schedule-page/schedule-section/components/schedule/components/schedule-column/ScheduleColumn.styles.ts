import { SxProps, Theme } from '@mui/material/styles';

export const column: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: { mobile: '100%', tablet: '148px' },
  height: { mobile: '100%', tablet: '1344px' },
};
