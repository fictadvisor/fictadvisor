import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

import theme from '@/styles/theme';

export const content: SxProps<Theme> = {
  paddingBottom: {
    mobile: '36px',
    mobileMedium: '363px',
  },
  width: {
    mobile: '100%;',
    mobileMedium: 'fit-content',
  },
};

export const divider: SxProps<Theme> = {
  typography: theme.typography.body1,
  padding: '16px 0 12px',
};

export const textContent: SxProps<Theme> = {
  typography: theme.typography.h4Bold,
  marginBottom: '24px',
};

export const buttonGroup: SxProps<Theme> = {
  marginTop: '24px',
  width: '184px',
  padding: '8px 16px',
};

export const alertDesktopPending: SxProps<Theme> = {
  width: 'fit-content',
};
export const alertMobile: SxProps<Theme> = {
  marginBottom: '20px',
  display: {
    mobile: 'flex',
    mobileMedium: 'none',
  },
};

export const alertDesktop: SxProps<Theme> = {
  marginBottom: '16px',
  display: {
    mobile: 'none',
    mobileMedium: 'flex',
  },
};
