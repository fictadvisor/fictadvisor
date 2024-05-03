import { SxProps, Theme } from '@mui/material/styles';

export const page: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'stretch',
  flexDirection: 'column',
  padding: {
    mobileSemiMedium: '16px 80px 50px 80px',
    mobile: '16px 40px 50px 40px',
  },
};

export const breadcrumbs: SxProps<Theme> = {
  marginBottom: '24px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
};

export const form: SxProps<Theme> = {
  width: { tablet: '480px', mobile: '100%' },
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
};

export const button: SxProps<Theme> = {
  width: '150px',
  height: '48px',
  borderRadius: '8px',
};

export const leftBlock: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
};

export const block: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};
export const rightBlock: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
};

export const verticalDivider: SxProps<Theme> = {
  backgroundColor: 'white.main',
  display: { mobile: 'none', tablet: 'block' },
};

export const divider: SxProps<Theme> = {
  borderColor: 'grey.400',
  color: 'grey.500',
};

export const container: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-evenly',
  flexDirection: { mobile: 'column', tablet: 'row' },
  gap: { mobile: '16px', tablet: '48px' },
};
