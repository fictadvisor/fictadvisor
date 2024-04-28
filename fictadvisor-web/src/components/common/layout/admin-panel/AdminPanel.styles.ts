import { SxProps, Theme } from '@mui/material/styles';
import { alpha } from '@mui/system';

import theme from '@/styles/theme';

export const drawer: SxProps<Theme> = {
  '& .MuiDrawer-paper': {
    width: '240px',
    border: 'none',
    backgroundColor: alpha(theme.palette.grey[50], 0.62),
  },
};

export const tabList: SxProps<Theme> = {
  color: 'grey.800',
  padding: '8px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

export const tab = (
  index: number,
  link: string,
  currentPath: string,
): SxProps<Theme> => ({
  width: index === 10 || index === 11 ? '194px' : '208px',
  marginLeft: index === 10 || index === 11 ? '14px' : 0,
  backgroundColor:
    link === currentPath ? 'backgroundDark.200' : 'backgroundDark.100',
  height: '40px',
  padding: '8px 16px',
  display: 'flex',
  gap: '8px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: 'backgroundDark.200',
  },
});

export const tabIcon: SxProps<Theme> = {
  width: '24px',
};

export const tabText: SxProps<Theme> = {
  typography: 'body2Medium',
};

export const pollPartHeader: SxProps<Theme> = {
  typography: 'body2Medium',
  padding: '4px 0 0',
};
