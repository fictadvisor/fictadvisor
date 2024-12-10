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
