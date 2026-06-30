import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

import theme from '@/styles/theme';

export const fixSized: SxProps<Theme> = {
  width: 'fit-content',
};
export const lastColumn: SxProps<Theme> = {
  justifyContent: 'flex-end',
  gap: '8px',
  '& button': {
    color: theme.palette.white.main,
  },
};

export const divider: SxProps<Theme> = {
  pb: '20px',
  typography: theme.typography.body1,
};

export const fullName: SxProps<Theme> = {
  typography: {
    mobile: 'overline',
    desktop: 'body2Bold',
  },
};

export const email: SxProps<Theme> = {
  typography: {
    mobile: 'body1Bold',
    desktop: 'body2Medium',
  },
};
