import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

export const button: SxProps<Theme> = {
  width: { mobile: 'min-content' },
  whiteSpace: 'nowrap',
};

export const dividerWrapper: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '18px',
  alignItems: 'center',
  pb: '20px',
  typography: 'body1',
};
