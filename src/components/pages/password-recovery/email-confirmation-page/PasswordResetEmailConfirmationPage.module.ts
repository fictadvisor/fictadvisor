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
  maxWidth: '452px',
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
  marginBottom: {
    mobile: '26px',
    mobileMedium: '32px',
  },
};

export const title: SxProps<Theme> = {
  marginBottom: {
    mobile: '28px',
    mobileMedium: '24px',
  },
  typography: {
    mobile: 'h4Bold',
    mobileMedium: 'h3SemiBold',
  },
};

export const description: SxProps<Theme> = {
  color: 'grey.500',
  typography: {
    mobile: 'body2',
    mobileMedium: 'h6',
  },
  marginBottom: {
    mobile: '8px',
    mobileMedium: '24px',
  },
  flexWrap: 'wrap',
};

export const email: SxProps<Theme> = {
  display: 'inline',
  color: 'grey.500',
  typography: {
    mobile: 'body2Bold',
    mobileMedium: 'h6Bold',
  },
};

export const flex: SxProps<Theme> = {
  display: {
    mobile: 'block',
    mobileMedium: 'flex',
  },
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: {
    mobile: '28px',
    mobileMedium: '32px',
  },
  gap: '8px',
};

export const question: SxProps<Theme> = {
  typography: {
    mobile: 'body2',
    mobileMedium: 'h6',
  },
  color: 'grey.500',
};

export const button: SxProps<Theme> = {
  marginTop: {
    mobile: '0',
    mobileMedium: '2px',
  },
  maxWidth: {
    mobile: 'auto',
    mobileMedium: '170px',
  },
};

export const arrow: SxProps<Theme> = {
  svg: {
    width: '20px',
    height: '20px',
  },

  marginTop: {
    mobile: '16px',
    mobileMedium: '38px',
  },
};
