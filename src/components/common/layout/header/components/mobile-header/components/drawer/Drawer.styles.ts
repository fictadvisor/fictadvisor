import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const menu: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '16px',
  marginRight: '16px',
  gap: '8px',
  paddingBottom: '16px',
  paddingTop: '8px',
};

export const menuTab: SxProps<Theme> = {
  maxWidth: {
    mobile: '100%',
  },
};

export const activeMenuTab: SxProps<Theme> = {
  backgroundColor: 'backgroundDark.200',
  border: {
    mobile: `1px solid ${theme.palette.backgroundDark[200]}`,
    desktopSemiMedium: `2px solid ${theme.palette.backgroundDark[200]}`,
  },
  color: 'inherit',
  maxWidth: {
    mobile: '100%',
  },
};

export const divider = (isLoggined: boolean): SxProps<Theme> => ({
  marginTop: isLoggined ? '12px' : '24px',
  marginBottom: '12px',
  borderColor: 'grey.400',
});

export const drawer: SxProps<Theme> = {
  '.MuiDrawer-paper': {
    backgroundColor: 'backgroundDark.100',
    marginTop: '64px',
    color: 'unset',
    boxShadow: 'unset',
  },
  zIndex: 2,
};
