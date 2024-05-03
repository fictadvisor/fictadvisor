import { SxProps, Theme } from '@mui/material/styles';

export const dropdownContainer: SxProps<Theme> = {
  marginTop: '12px',
  display: 'flex',
  width: '100%',
  gap: '32px',
};

export const checkboxContainer: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '52px',
};

export const registerButton: SxProps<Theme> = {
  marginTop: '16px',
  marginBottom: '50px',
  padding: {
    mobile: '12px 24px',
    tablet: '16px 32px',
  },
  borderRadius: '8px',
};

export const checkbox: SxProps<Theme> = {
  marginTop: '14px',
};
