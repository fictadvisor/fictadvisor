import { SxProps, Theme } from '@mui/material/styles';

export const infoWrapper: SxProps<Theme> = {
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
};

export const divider: SxProps<Theme> = {
  mb: '4px',
  height: '1px',
  width: '100%',
  backgroundColor: 'grey.800',
};
export const input: SxProps<Theme> = {
  '.MuiInputLabel-outlined': {
    top: '-2px',
  },
  '.MuiInputLabel-outlined.MuiInputLabel-shrink': {
    top: '0px',
  },
};
