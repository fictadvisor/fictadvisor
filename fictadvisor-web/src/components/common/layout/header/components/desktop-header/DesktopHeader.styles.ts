import { SxProps, Theme } from '@mui/material/styles';
import { alpha } from '@mui/system';

import theme from '@/styles/theme';

export const headerContainer: SxProps<Theme> = {
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '64px',
  justifyContent: 'space-between',
  paddingLeft: '80px',
  paddingRight: '80px',
  boxShadow: 'unset',
  backgroundColor: alpha(theme.palette.grey[50], 0.62),
  backdropFilter: 'blur(8px)',
};

export const menu: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  width: 'fit-content',
  gap: '16px',
};

export const headerDesktopCard: SxProps<Theme> = {
  width: 'fit-content',
};

export const logoContainer: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

export const button = (currentPath: string, link: string): SxProps<Theme> => ({
  typography: 'body1Medium',
  textUnderlineOffset: '5px',
  textDecoration: currentPath === link ? 'underline' : 'none',
  '&:hover': {
    textUnderlineOffset: '5px',
  },
});
