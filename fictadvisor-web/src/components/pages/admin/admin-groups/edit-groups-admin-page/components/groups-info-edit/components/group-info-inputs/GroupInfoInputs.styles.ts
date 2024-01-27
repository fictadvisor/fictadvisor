import { SxProps, Theme } from '@mui/material/styles';

export const inputsWrapper: SxProps<Theme> = {
  width: '100%',
  maxWidth: '308px',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  '.MuiAutocomplete-root': {
    '.MuiFormLabel-root': {
      color: 'inherit',
      padding: '0px',
      top: '-3px',
      left: '-1px',
    },
  },
  padding: '24px 0 0 0',
};

export const input: SxProps<Theme> = {
  width: '308px',
  '.MuiInputLabel-outlined': {
    top: '-2px',
  },
  '.MuiInputLabel-outlined.MuiInputLabel-shrink': {
    top: '0px',
  },
};
