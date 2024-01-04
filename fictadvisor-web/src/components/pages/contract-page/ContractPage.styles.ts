import { SxProps, Theme } from '@mui/material/styles';
export const page: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: {
    mobileSemiMedium: '16px 40px 50px 40px',
    mobile: '16px 40px 50px 40px',
  },
};

export const form: SxProps<Theme> = {
  width: { tablet: '90%', mobile: '100%' },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};
export const divider: SxProps<Theme> = {
  borderColor: 'grey.400',
  color: 'grey.500',
};
export const breadcrumbs: SxProps<Theme> = {
  marginBottom: '24px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
};

export const item: SxProps<Theme> = {
  marginTop: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '16px',
  width: { tablet: '480px', mobile: '100%' },
};
