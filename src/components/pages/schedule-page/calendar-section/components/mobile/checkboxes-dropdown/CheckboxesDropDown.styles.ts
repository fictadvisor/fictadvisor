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

export const tag: SxProps<Theme> = { mr: '6px' };
