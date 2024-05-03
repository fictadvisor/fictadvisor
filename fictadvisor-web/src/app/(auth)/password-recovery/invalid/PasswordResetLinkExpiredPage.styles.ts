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
  maxWidth: '558px',
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
      mobile: '36px',
      mobileMedium: '48px',
    },
    height: {
      mobile: '36px',
      mobileMedium: '48px',
    },
  },
  padding: {
    mobile: '0px',
    mobileMedium: '8px',
  },
  marginBottom: {
    mobile: '26px',
    mobileMedium: '32px',
  },
};

export const title: SxProps<Theme> = {
  marginBottom: {
    mobile: '10px',
    mobileMedium: '26px',
  },
  typography: {
    mobile: 'h4Bold',
    mobileMedium: 'h3SemiBold',
  },
};

export const description: SxProps<Theme> = {
  maxWidth: '480px',
  typography: {
    mobile: 'body2',
    mobileMedium: 'h6Medium',
  },
  marginBottom: {
    mobile: '18px',
    mobileMedium: '36px',
  },
  color: 'grey.500',
};

export const button: SxProps<Theme> = {
  maxWidth: '480px',
  marginBottom: {
    mobile: '28px',
    mobileMedium: '36px',
  },
};

export const buttonBack: SxProps<Theme> = {
  maxWidth: '480px',
  padding: {
    mobile: '0',
    mobileMedium: 'auto',
  },
};
