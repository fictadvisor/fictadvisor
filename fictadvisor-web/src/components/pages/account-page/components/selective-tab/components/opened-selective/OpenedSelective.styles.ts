import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  margin: '16px 0',
};

export const text: SxProps<Theme> = {
  typography: {
    mobile: 'body2Bold',
    tablet: 'h6',
  },
};

export const disciplines: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: {
    mobile: '1fr',
    tablet: '1fr 1fr',
  },
  rowGap: '8px',
  marginTop: '8px',
  marginBottom: '20px',
};

export const button: SxProps<Theme> = {
  width: 'fit-content',
};

export const checkbox: SxProps<Theme> = {
  width: '100%',
  alignItems: 'start',
  '.MuiTypography-root': {
    whiteSpace: 'normal',
  },
};
