import { SxProps, Theme } from '@mui/material/styles';

import getColor from './constants';

export const alert = (color, variant): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '8px',
  padding: '12px',
  width: 'fit-content',
  color: 'grey.800',
  transition: 'none !important',

  ...(variant !== 'border-top' &&
    variant !== 'border-left' && {
      borderRadius: '8px',
    }),

  ...(variant !== 'outlined' && {
    backgroundColor: getColor(color, variant),
  }),
  ...(variant === 'outlined' && {
    border: `solid 1px`,
    borderColor: getColor(color, variant),
  }),

  ...(variant === 'border-top' && {
    borderTop: `solid 4px`,
    borderColor: getColor(color, 'outlined'),
  }),

  ...(variant === 'border-left' && {
    borderLeft: `solid 4px`,
    borderColor: getColor(color, 'outlined'),
  }),

  '.MuiAlert-icon, .MuiAlert-action': {
    color: 'grey.800',
    margin: '4px 0 0 0',
    padding: '0',
    svg: {
      strokeWidth: '1.5px',
      width: '16px',
      height: '16px',
    },
  },

  '.MuiAlert-action': {
    cursor: 'pointer',
  },

  '.MuiAlert-message': {
    padding: '0px',
    marginRight: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
});
