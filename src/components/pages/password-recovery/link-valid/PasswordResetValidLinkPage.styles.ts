import { SxProps, Theme } from '@mui/material/styles';

export const container: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  minHeight: '100vh',
};

export const content: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  padding: '0 16px',
  maxWidth: '512px',
  height: 'fit-content',
  paddingTop: {
    mobile: '103px',
    mobileMedium: '206px',
  },
  textAlign: 'center',
};

export const icon: SxProps<Theme> = {
  svg: {
    width: {
      mobile: '48px',
      mobileMedium: '64px',
    },
    height: {
      mobile: '48px',
      mobileMedium: '64px',
    },
  },
  marginBottom: {
    mobile: '24px',
    mobileMedium: '32px',
  },
  padding: {
    mobile: '0px',
    mobileMedium: '8px',
  },
};

export const title: SxProps<Theme> = {
  typography: {
    mobile: 'h4Medium',
    mobileMedium: 'h3SemiBold',
  },
  marginBottom: {
    mobile: '10px',
    mobileMedium: '24px',
  },
};

export const description: SxProps<Theme> = {
  marginBottom: {
    mobile: '26px',
    mobileMedium: '24px',
  },
  typography: {
    mobile: 'body2',
    mobileMedium: 'h6',
  },
  color: 'grey.500',
};
export const button: SxProps<Theme> = {
  padding: '16px 0',
};
