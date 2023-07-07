import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

export const fixSized: SxProps<Theme> = { width: 'fit-content' };
export const lastColumn: SxProps<Theme> = {
  justifyContent: 'flex-end',
  gap: '8px',
  '& button': {
    color: 'white.main',
  },
};

export const divider: SxProps<Theme> = {
  pb: '20px',
  typography: 'body1',
};
