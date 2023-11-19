import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const wrapper: SxProps<Theme> = {
  flexDirection: 'column',
  gap: '16px',
  padding: '24px 0 16px 0',
};

export const input: SxProps<Theme> = {
  width: '308px',
  '& .MuiInputLabel-shrink': { transform: '' },
};

export const textArea: SxProps<Theme> = {
  width: '655px',
  '& .MuiInputLabel-shrink': { transform: '' },
  '&.MuiFormControl-root': {
    '& .MuiInputBase-root, label': {
      margin: 0,
    },
  },
  mb: '20px',
  '& .MuiInputBase-root': {
    backgroundColor: 'backgroundDark.100',
  },
  '& .MuiFormLabel-root': {
    background: theme.palette.backgroundDark[100],
  },
};
