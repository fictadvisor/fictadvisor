import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const wrapper: SxProps<Theme> = {
  width: '100%',
};

export const label = (state: string): SxProps<Theme> => ({
  overflow: 'unset',
  padding: '2px 8px',
  maxWidth: '100%',
  // Makes only lower half of the label to have background (designers asked to do this)
  background: `linear-gradient(180deg, rgba(30, 30, 30, 0) 49.48%, ${theme.palette.backgroundDark[50]} 49.95%)`,

  ...(state === 'error' && {
    color: 'error.500',
    '&.Mui-focused': {
      color: 'error.500',
    },
  }),

  ...(state === 'default' && {
    color: 'grey.800',
    '&.Mui-focused': {
      color: 'grey.800',
    },
  }),

  '&.Mui-disabled': {
    color: 'grey.400',
  },
});

export const errorRemark: SxProps<Theme> = {
  margin: '2px 8px 0 16px',
  color: 'error.500',
  typography: 'overline',
  minHeight: '20px',
};

export const input = (state: string, size: string): SxProps<Theme> => ({
  transition: 'all 0.2s ease-in-out',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',

  gap: '8px',
  backgroundColor: 'backgroundDark.50',
  borderRadius: '8px',
  resize: 'none',
  border: '2px solid',
  color: 'grey.800',

  ...(size === 'medium' && {
    padding: '16px 16px 16px 20px',
    typography: 'body2',
  }),

  ...(size === 'small' && {
    padding: '12px',
    typography: 'body1',
  }),

  ...(state === 'default' && {
    borderColor: 'grey.500',
    '&:hover': {
      borderColor: 'grey.700',
    },
    '&.Mui-focused': {
      borderColor: 'grey.700',
    },
  }),

  ...(state === 'error' && {
    borderColor: 'error.500',
  }),

  '&.Mui-disabled': {
    borderColor: 'grey.400',
  },

  textarea: {
    paddingRight: '8px',
    '::placeholder': {
      color: 'grey.500',
    },
  },

  fieldset: {
    border: 'none',
  },
});
