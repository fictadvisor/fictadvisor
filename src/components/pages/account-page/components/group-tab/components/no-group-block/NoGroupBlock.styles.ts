import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

import theme from '@/styles/theme';

export const content: SxProps<Theme> = {
  width: {
    mobile: '100%;',
    mobileMedium: 'fit-content',
  },
};

export const division: SxProps<Theme> = {
  display: 'flex',
  margin: '16px 0 24px 0',
  alignItems: 'center',
};

export const divisionWhite: SxProps<Theme> = {
  flexGrow: '1',
  backgroundColor: 'white',
  height: '1px',
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
  display: {
    mobile: 'flex',
    mobileMedium: 'none',
  },
};

export const alertDesktop: SxProps<Theme> = {
  display: 'none',
};

export const alert: SxProps<Theme> = {
  marginBottom: '20px',

  textWrap: {
    mobile: 'normal',
    desktop: 'auto',
  },
  height: {
    mobile: 'fit-content',
    desktop: 'auto',
  },
  display: {
    mobile: 'none',
    mobileMedium: 'auto',
  },
};
