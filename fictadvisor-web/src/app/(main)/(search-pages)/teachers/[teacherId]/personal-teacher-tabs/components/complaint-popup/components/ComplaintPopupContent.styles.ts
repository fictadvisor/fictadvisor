import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  columns: {
    mobile: '1',
    mobileSemiMedium: '2',
    tablet: '3',
    desktop: '4',
  },
};

export const subtitleWrapper: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  marginBottom: '16px',
};

export const subtitle: SxProps<Theme> = {
  typography: 'body1Medium',
  maxWidth: '502px',
};

export const inputsWrapper: SxProps<Theme> = {
  maxWidth: '480px',
  display: 'flex',
  gap: '16px',
  flexDirection: 'column',
};

export const groupDropdownWrapper: SxProps<Theme> = {
  marginTop: '8px',
  marginBottom: '20px',
  '.MuiFormLabel-root': {
    color: 'inherit !important',
    padding: '1.5px 8px !important',
    top: '-3px',
    left: '-4px',
  },
};
