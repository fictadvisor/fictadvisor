import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  width: '100%',
};

export const inputLabel: SxProps<Theme> = {
  '& .MuiInputLabel-shrink': { transform: '' },
};

export const autocomplete: SxProps<Theme> = {
  '& .Mui-focused': {
    paddingTop: '15px',
  },
  '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
    padding: '0 14px 0 5px',
  },
};

export const input: SxProps<Theme> = {
  '& .MuiInputBase-root': {
    height: '100%',
    WebkitTransform: 'unset',
  },
  '& .MuiFormLabel-root.MuiInputLabel-root': {
    top: -3,
    '&.Mui-focused': {
      top: -15,
    },
  },
};

export const tag: SxProps<Theme> = { m: '3px' };
