import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const textAreaWrapper: SxProps<Theme> = {
  flex: '1 1 auto',
};

export const textArea: SxProps<Theme> = {
  typography: 'body1Medium',
  backgroundColor: 'backgroundDark.100',
  margin: '0 auto',
  maxWidth: '1033px',
  width: '100%',
  '& .MuiInputLabel-shrink': { transform: '' },
  '&.MuiFormControl-root': {
    '& .MuiInputBase-root, label': {
      margin: 0,
    },
  },
  mb: '2px',
  '& .MuiInputBase-root': {
    backgroundColor: 'backgroundDark.100',
  },
  '& .MuiFormLabel-root': {
    background: theme.palette.backgroundDark[100],
  },
};

export const trashIcon: SxProps<Theme> = {
  padding: '6px',
  borderRadius: '50%',
  flex: '0 0 32px',
  height: '32px',
  width: '32px',
};

export const text: SxProps<Theme> = {
  maxWidth: '1033px',
  width: '100%',
  margin: '0 auto',
  textAlign: 'end',
  typography: theme.typography.body1,
  color: 'grey.400',
};
