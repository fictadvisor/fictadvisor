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

export const text: SxProps<Theme> = {
  textAlign: 'center',
  color: 'grey.500',
  typography: {
    mobile: 'body2',
    mobileMedium: 'h6Medium',
  },
  marginBottom: {
    mobile: '29px',
    mobileMedium: '16px',
  },
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
    mobile: '20px',
    mobileMedium: '32px',
  },
};

export const title: SxProps<Theme> = {
  marginBottom: {
    mobile: '20px',
    mobileMedium: '24px',
  },
  typography: {
    mobile: 'h4Medium',
    mobileMedium: 'h3SemiBold',
  },
};

export const form: SxProps<Theme> = {
  width: '100%',
  marginBottom: {
    mobile: '12px',
    mobileMedium: '24px',
  },
};
