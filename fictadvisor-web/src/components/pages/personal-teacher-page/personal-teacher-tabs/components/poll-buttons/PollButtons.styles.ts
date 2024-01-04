import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  textAlign: {
    mobile: 'left',
    tablet: 'center',
  },

  '.MuiTypography-root': {
    maxWidth: '430px',
  },

  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: {
    mobile: 'flex-start',
    tablet: 'center',
  },
  gap: '32px',
  padding: '16px',
  margin: '50px 0',
};

export const button: SxProps<Theme> = {
  width: 'fit-content',
};

export const buttonWrapper: SxProps<Theme> = {
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
};
