import { SxProps, Theme } from '@mui/material/styles';

import getColor from './utils/get-color';
import {
  IconButtonColor,
  IconButtonShape,
  IconButtonSize,
  IconButtonState,
} from './types';

export const button = (
  shape: IconButtonShape,
  color: IconButtonColor,
  size: IconButtonSize,
): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'grey.800',
  minWidth: 'unset',
  minHeight: 'unset',
  padding: ' 6px',
  ...(shape === IconButtonShape.CIRCLE && {
    ...(size === IconButtonSize.NORMAL && {
      borderRadius: '18px',
    }),
    ...(size === IconButtonSize.LARGE && {
      borderRadius: '24px',
    }),
  }),

  ...(shape === IconButtonShape.SQUARE && {
    borderRadius: '4px',
  }),

  backgroundColor: getColor(color, IconButtonState.DEFAULT),
  border: `1px transparent solid`,
  '&:hover': {
    backgroundColor: getColor(color, IconButtonState.HOVER),
  },
  '&:focus': {
    backgroundColor: getColor(color, IconButtonState.FOCUSED),
    borderColor: getColor(color, IconButtonState.BORDER),
  },
  '&:active': {
    backgroundColor: getColor(color, IconButtonState.ACTIVE),
  },
  '&:disabled': {
    color: 'grey.200',
    backgroundColor: 'transparent',
    cursor: 'not-allowed',
    border: 'transparent',
  },
});

export const iconStyles = (size: IconButtonSize): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignContent: 'center',
  padding: '0',
  border: 'none',
  ...(size === IconButtonSize.LARGE && {
    width: '32px',
    height: '32px',
    svg: {
      width: '32px',
      height: '32px',
    },
  }),
  ...(size === IconButtonSize.NORMAL && {
    svg: {
      width: '24px',
      height: '24px',
    },
    width: '24px',
    height: '24px',
  }),
});
