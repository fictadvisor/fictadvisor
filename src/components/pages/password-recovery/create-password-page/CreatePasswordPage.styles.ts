import { SxProps, Theme } from '@mui/material/styles';

export const container: SxProps<Theme> = {
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  flexDirection: 'column',
  maxWidth: '512px',
  width: '100%',
  padding: '206px 16px 0 16px',
};

export const content: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const icon: SxProps<Theme> = {
  svg: {
    width: {
      mobile: '36px',
      mobileMedium: '48px',
    },
    height: {
      mobile: '36px',
      mobileMedium: '48px',
    },
  },
  marginBottom: {
    mobile: '26px',
    mobileMedium: '32px',
  },
};

export const title: SxProps<Theme> = {
  textAlign: 'center',
  typography: {
    mobile: 'h4Medium',
    mobileMedium: 'h3SemiBold',
  },
  marginBottom: {
    mobile: '20px',
    mobileMedium: '14px',
  },
};

export const form: SxProps<Theme> = {
  width: '100%',
  marginBottom: {
    mobile: '16px',
    mobileMedium: '24px',
  },
};
