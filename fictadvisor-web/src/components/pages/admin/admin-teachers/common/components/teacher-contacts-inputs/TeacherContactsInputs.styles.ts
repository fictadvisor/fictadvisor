import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const wrapper: SxProps<Theme> = {
  padding: '12px',
  flexDirection: 'column',
  gap: '10px',
  mb: '12px',
};

export const subtitle: SxProps<Theme> = {
  typography: theme.typography.body1,
  mb: '8px',
};

export const contactsWrapper: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(4, 1fr)',
  gridColumnGap: '20px',
  gridRowGap: '10px',
};
