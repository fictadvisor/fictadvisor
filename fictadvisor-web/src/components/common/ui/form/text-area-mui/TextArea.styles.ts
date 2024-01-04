import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

import { TextAreaSize, TextAreaState } from './types';

export const wrapper: SxProps<Theme> = {
  width: '100%',
};

export const label = (state: TextAreaState): SxProps<Theme> => ({
  overflow: 'unset',
  padding: '2px 8px',
  maxWidth: '100%',
  marginTop: '2rem',
  // Temporary solution, need to be fixed
  background: `linear-gradient(180deg, rgba(30, 30, 30, 0) 49.48%, ${theme.palette.backgroundDark[50]} 49.95%)`,

  ...(state === TextAreaState.ERROR && {
    color: 'error.500',
    '&.Mui-focused': {
      color: 'error.500',
    },
  }),

  ...(state === TextAreaState.DEFAULT && {
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

export const input = (
  state: TextAreaState,
  size: TextAreaSize,
): SxProps<Theme> => ({
  transition: 'all 0.2s ease-in-out',
  width: '100%',
  display: 'flex',
  marginTop: '2rem',
  flexDirection: 'row',
  alignItems: 'flex-start',

  gap: '8px',
  backgroundColor: 'backgroundDark.50',
  borderRadius: '8px',
  resize: 'none',
  border: '2px solid',
  color: 'grey.800',

  ...(size === TextAreaSize.MEDIUM && {
    padding: '16px 16px 16px 20px',
    typography: 'body2',
  }),

  ...(size === TextAreaSize.SMALL && {
    padding: '12px',
    typography: 'body1',
  }),

  ...(state === TextAreaState.DEFAULT && {
    borderColor: 'grey.500',
    '&:hover': {
      borderColor: 'grey.700',
    },
    '&.Mui-focused': {
      borderColor: 'grey.700',
    },
  }),

  ...(state === TextAreaState.ERROR && {
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
