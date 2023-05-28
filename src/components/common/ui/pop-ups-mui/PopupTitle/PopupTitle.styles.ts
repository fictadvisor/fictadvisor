import { SxProps, Theme } from '@mui/material/styles';

import typography from '@/styles/theme/constants/typography';

export const iconButton: SxProps<Theme> = {
  position: 'absolute',
  right: 8,
  top: 16,
  color: 'grey.800',
};

export const dialogTitle: SxProps<Theme> = {
  m: 0,
  padding: 0,
  '.MuiTypography-root': {
    typography: typography.h6Bold,
  },
};
