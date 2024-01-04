import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  width: '100%',
};
export const formControl = (
  state: string,
  disabled: boolean,
): SxProps<Theme> => ({
  width: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  paddingBottom: '7px',
  border: '2px solid',
  borderRadius: '8px',
  transition: 'all 0.2s ease-in-out',

  ...(state === 'default' &&
    !disabled && {
      borderColor: 'grey.500',
      color: 'grey.500',
      '&:hover': {
        color: 'grey.700',
        borderColor: 'grey.700',
      },
      '&:focus-within': {
        color: 'grey.700',
        borderColor: 'grey.700',
      },
    }),

  ...(state === 'error' &&
    !disabled && {
      borderColor: 'error.500',
    }),

  ...(disabled && {
    color: 'grey.400',
    borderColor: 'grey.400',
  }),
});
export const input: SxProps<Theme> = {
  padding: '0',
  marginTop: '8px',
  marginRight: '8px',
  width: '100%',

  backgroundColor: 'backgroundDark.50',
  color: 'grey.800',
  typography: 'body2',

  textarea: {
    cursor: 'auto',
    paddingRight: '8px',
    textOverflow: 'ellipsis',
    '::placeholder': {
      color: 'grey.500',
    },
  },

  fieldset: {
    border: 'none',
  },
};

export const errorRemark: SxProps<Theme> = {
  margin: '2px 8px 0 16px',
  color: 'error.500',
  typography: 'overline',
  minHeight: '20px',
};
