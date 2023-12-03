import { SxProps, Theme } from '@mui/material/styles';

import {
  InputSize,
  InputState,
  InputType,
} from '@/components/common/ui/form/input-mui/types';
import theme from '@/styles/theme';

export const wrapper: SxProps<Theme> = {
  width: '100%',
  padding: 0,
};

export const label = (state: InputState): SxProps<Theme> => ({
  overflow: 'hidden',
  padding: '2px 8px',
  maxWidth: '78%',
  background: `linear-gradient(180deg, rgba(30, 30, 30, 0) 50%, ${theme.palette.backgroundDark[100]} 49.95%)`,

  ...(state === InputState.ERROR && {
    color: theme.palette.error[500],
    '&.Mui-focused': {
      color: theme.palette.error[500],
    },
  }),

  ...(state === InputState.READONLY && {
    color: theme.palette.grey[800],
    '&.Mui-focused': {
      color: theme.palette.grey[800],
    },
    '&:hover': {
      cursor: 'pointer',
    },
  }),

  ...(state === InputState.SUCCESS && {
    color: theme.palette.success[600],
    '&.Mui-focused': {
      color: theme.palette.success[600],
    },
  }),

  ...(state === InputState.DEFAULT && {
    color: theme.palette.grey[800],
    '&.Mui-focused': {
      color: theme.palette.grey[800],
    },
  }),

  '&.Mui-disabled': {
    color: theme.palette.grey[200],
  },
});

export const remark = (state: InputState): SxProps<Theme> => ({
  margin: '2px 8px 0 16px',
  '&.MuiFormHelperText-root': {
    textTransform: 'none',
  },

  ...(state === InputState.ERROR && {
    color: theme.palette.error[500],
  }),

  ...(state === InputState.SUCCESS && {
    color: theme.palette.success[600],
  }),

  typography: theme.typography.overline,
  minHeight: '20px',
});

export const input = (state: InputState, size: InputSize): SxProps<Theme> => ({
  transition: 'all 0.2s ease-in-out',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: theme.palette.backgroundDark[100],
  borderRadius: '8px',
  resize: 'none',
  border: '2px solid',
  color: theme.palette.grey[800],

  ...(size === InputSize.LARGE && {
    padding: '14px 16px',
    typography: theme.typography.body2,
  }),

  ...(size === InputSize.MEDIUM && {
    padding: '13px 12px',
    typography: theme.typography.body1,
  }),

  ...(state === InputState.READONLY && {
    borderColor: theme.palette.grey[500],
    '&:hover': {
      cursor: 'pointer',
      borderColor: theme.palette.grey[700],
    },
    '&.MuiOutlinedInput-root': {
      input: {
        cursor: 'pointer',
      },
    },
  }),

  ...(state === InputState.DEFAULT && {
    borderColor: theme.palette.grey[500],
    '&:hover': {
      borderColor: theme.palette.grey[700],
    },
    '&.Mui-focused': {
      borderColor: theme.palette.grey[700],
    },
  }),

  ...(state === InputState.ERROR && {
    borderColor: theme.palette.error[500],
  }),

  ...(state === InputState.SUCCESS && {
    borderColor: theme.palette.success[600],
  }),

  '&.Mui-disabled': {
    borderColor: theme.palette.grey[200],
    color: theme.palette.grey[200],
  },

  svg: {
    ...(size === InputSize.LARGE && {
      width: '24px',
      height: '24px',
    }),

    ...(size === InputSize.MEDIUM && {
      width: '22px',
      height: '22px',
    }),

    flexShrink: '0',
    p: 0,
  },

  input: {
    '&.Mui-disabled': {
      WebkitTextFillColor: theme.palette.grey[200],
      '&:hover': {
        cursor: 'not-allowed',
      },
    },
    padding: 0,
    '::placeholder': {
      color: theme.palette.grey[500],
    },
  },

  fieldset: {
    border: 'none',
  },
});

export const rightIcon = (type: InputType, state: InputState) => ({
  ...((type === InputType.SEARCH || type === InputType.PASSWORD) && {
    cursor: 'pointer',
  }),
  ...((type === InputType.PASSWORD || type === InputType.SEARCH) &&
    state === InputState.DISABLED && {
      cursor: 'not-allowed',
    }),
  ...(state === InputState.ERROR &&
    type !== InputType.PASSWORD && {
      color: theme.palette.error[500],
    }),
  ...(state === InputState.SUCCESS &&
    type !== InputType.PASSWORD && {
      color: theme.palette.success[600],
    }),
});

export const glassIcon = (type: InputType, state: InputState) => ({
  ...(type === InputType.SEARCH &&
    state === InputState.DISABLED && {
      color: theme.palette.grey[200],
    }),
});
