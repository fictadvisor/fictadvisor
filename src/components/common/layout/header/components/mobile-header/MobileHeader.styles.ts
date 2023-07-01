import { SxProps, Theme } from '@mui/material/styles';
import { alpha } from '@mui/system';

import theme from '@/styles/theme';
export const headerContainer = (isOpened: boolean): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '64px',
  backgroundColor: isOpened
    ? theme.palette.backgroundDark[100]
    : alpha(theme.palette.grey[50], 0.62),
  backdropFilter: 'blur(8px)',
  boxShadow: 'unset',
});

export const headerLogo: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
};

export const iconButton: SxProps<Theme> = {
  position: 'absolute',
  right: '10px',
};
