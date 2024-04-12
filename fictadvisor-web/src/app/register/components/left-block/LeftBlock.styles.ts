import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';
export const leftBlock: SxProps<Theme> = {
  width: '480px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

export const telegramConnected: SxProps<Theme> = {
  color: theme.palette.grey[500],
  marginTop: '14px',
  textAlign: 'center',
};

export const divider: SxProps<Theme> = {
  width: '100%',
};

export const loginHeader: SxProps<Theme> = {
  marginTop: '36px',
  textAlign: 'center',
  fontSize: '36px',
  lineHeight: '128%',
  fontWeight: '600',
  display: {
    mobile: 'none',
    desktopSemiMedium: 'block',
  },
};

export const telegramButton: SxProps<Theme> = {
  margin: '16px 0',
  display: {
    mobile: 'none',
    tablet: 'flex',
  },
  borderRadius: '8px',
};

export const mobileTelegramButton: SxProps<Theme> = {
  margin: '0 0 16px 0',
  padding: '16px 0',
  typography: 'buttonBold',
  whiteSpace: 'normal',
  display: {
    mobile: 'flex',
    tablet: 'none',
  },
  borderRadius: '8px',
};

export const mobileText: SxProps<Theme> = {
  typography: 'body2Medium',
  margin: '0 0 14px 0',
  color: theme.palette.grey[600],
  display: {
    mobile: 'flex',
    desktopSemiMedium: 'none',
  },
};

export const loginMobileButton: SxProps<Theme> = {
  width: {
    mobile: '77px',
    tablet: 'fitContent',
  },
  marginBottom: '30px',
  display: {
    mobile: 'flex',
    desktopSemiMedium: 'none',
  },
  borderRadius: '6px',
};
