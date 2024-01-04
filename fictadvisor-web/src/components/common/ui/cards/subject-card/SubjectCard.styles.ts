import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

import theme from '@/styles/theme';

export const subjectCard = (disabled: boolean): SxProps<Theme> => ({
  backgroundColor: theme.palette.backgroundDark[300],
  padding: '16px',
  borderRadius: '6px',
  width: '100%',
  minWidth: 'fit-content',
  border: '1px solid transparent',
  transition: 'all 0.2s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  wordBreak: 'break-word',
  WebkitHyphens: 'auto',
  hyphens: 'auto',
  gap: '8px',
  ...(!disabled && {
    cursor: 'pointer',
    '&:focus': {
      borderColor: theme.palette.primary[300],
    },
    '&:active': {
      borderColor: 'primary.logo',
      backgroundColor: theme.palette.grey[200],
    },
    '&:hover': {
      boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
    },
  }),
  ...(disabled && {
    borderColor: 'transparent',
    backgroundColor: theme.palette.backgroundDark[500],
    pointerEvents: 'none',
    color: theme.palette.grey[500],
  }),
});

export const subjectName: SxProps<Theme> = {
  typography: 'body2Bold',
};
