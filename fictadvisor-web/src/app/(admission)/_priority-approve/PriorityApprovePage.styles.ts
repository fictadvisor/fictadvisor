import { SxProps, Theme } from '@mui/material/styles';

export const page: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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

export const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  width: { tablet: '480px', mobile: '100%' },
  '& input': {
    height: '52px',
    '::placeholder': {
      typography: 'body1',
      color: 'grey.800',
    },
    '&:hover': {
      '::placeholder': {
        color: 'grey.500',
      },
    },
  },
};

export const divider: SxProps<Theme> = {
  marginBottom: '12px',
  color: 'grey.500',
  '::after': {
    borderColor: 'gray.500',
  },
};

export const button: SxProps<Theme> = {
  minWidth: '150px',
  maxWidth: '177px',
  height: '48px',
  borderRadius: '8px',
};

export const entrantInfo: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: {
    mobile: '50px',
    desktopSemiMedium: '168px',
  },
  flexWrap: {
    mobile: 'wrap',
    desktopSemiMedium: 'nowrap',
  },
  '& div': {
    width: { tablet: '480px', mobile: '100%' },
  },
  '& button': {
    marginTop: '28px',
  },
};

export const nameAndSpeciality: SxProps<Theme> = {
  typography: 'h6Bold',
};

export const specialty: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

export const priority: SxProps<Theme> = {
  typography: 'body2',
};
