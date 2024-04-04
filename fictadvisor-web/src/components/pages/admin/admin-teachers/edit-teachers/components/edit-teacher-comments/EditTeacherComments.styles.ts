import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const wrapper: SxProps<Theme> = {
  padding: '12px',
  flexDirection: 'column',
  gap: '10px',
};

export const subtitle: SxProps<Theme> = {
  typography: theme.typography.body1,
  mb: '8px',
};

export const commentsWrapper: SxProps<Theme> = {
  gap: '10px',
};
