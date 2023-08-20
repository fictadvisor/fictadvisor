import { SxProps, Theme } from '@mui/material/styles';

import getColor from './utils/get-color';
import { AlertType, AlertVariant } from './types';

export const alert = (
  color: AlertType,
  variant: AlertVariant,
): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '8px',
  padding: '12px',
  width: 'fit-content',
  color: 'grey.800',
  transition: 'none !important',

  ...(variant !== AlertVariant.BORDER_LEFT &&
    variant !== AlertVariant.BORDER_TOP && {
      borderRadius: '8px',
    }),

  ...(variant !== AlertVariant.OUTLINED && {
    backgroundColor: getColor(color, variant),
  }),
  ...(variant === AlertVariant.OUTLINED && {
    border: `solid 1px`,
    borderColor: getColor(color, variant),
  }),

  ...(variant === AlertVariant.BORDER_TOP && {
    borderTop: `solid 4px`,
    borderColor: getColor(color, AlertVariant.OUTLINED),
  }),

  ...(variant === AlertVariant.BORDER_LEFT && {
    borderLeft: `solid 4px`,
    borderColor: getColor(color, AlertVariant.OUTLINED),
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
