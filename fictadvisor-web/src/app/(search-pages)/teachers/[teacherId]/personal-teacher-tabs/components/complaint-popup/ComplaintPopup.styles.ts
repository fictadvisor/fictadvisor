import { SxProps, Theme } from '@mui/material/styles';

export const popup: SxProps<Theme> = {
  '.MuiDialog-paper': {
    backgroundColor: '#1E1E1E',
    maxWidth: '848px',
    width: '100%',
    padding: {
      desktop: '0 40px',
      tablet: '0 20px',
      mobile: '0 8px',
    },
    margin: {
      desktop: '0 40px 30px 40px',
      tablet: '0 30px 24px 30px',
      mobile: '0 16px 18px 16px',
    },
  },
  '.MuiDialogContent-root': {
    padding: '0',
  },
  '.MuiOutlinedInput-root': {
    backgroundColor: '#1E1E1E',
  },
  '.MuiFormLabel-root': {
    background: '#1E1E1E',
    fontSize: '16px',
    lineHeight: '1.4',
  },
  '.MuiFormHelperText-root': {
    fontSize: '11px',
    lineHeight: '1.6',
  },
};

export const button: SxProps<Theme> = {
  borderColor: 'white',
};
