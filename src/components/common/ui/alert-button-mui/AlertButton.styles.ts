import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

import getColors from '@/components/common/ui/alert-button-mui/utils/get-colors';

import { AlertButtonState, AlertButtonVariant } from './types';

export const button = (
  variant: AlertButtonVariant,
  startIcon?: ReactNode,
  endIcon?: ReactNode,
  text?: string,
): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  color: 'grey.600',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: '700',
  minWidth: 'unset',
  minHeight: 'unset',
  width: '100%',

  ...((startIcon || endIcon) &&
    text && {
      gap: '6px',
      padding: '6px 12px',
    }),
  ...((startIcon || endIcon) &&
    !text && {
      padding: '6px',
      gap: 'none',
    }),
  ...(!(startIcon || endIcon) &&
    text && {
      padding: '8px 16px',
      gap: '0',
    }),
  border: `2px transparent solid`,
  backgroundColor: getColors(variant, AlertButtonState.DEFAULT).backgroundColor,
  borderColor: getColors(variant, AlertButtonState.DEFAULT).borderColor,
  '&:hover': {
    backgroundColor: getColors(variant, AlertButtonState.HOVER).backgroundColor,
    borderColor: getColors(variant, AlertButtonState.HOVER).borderColor,
  },
  '&:focus': {
    backgroundColor: getColors(variant, AlertButtonState.FOCUS).backgroundColor,
    borderColor: getColors(variant, AlertButtonState.FOCUS).borderColor,
  },
  '&:active': {
    backgroundColor: getColors(variant, AlertButtonState.ACTIVE)
      .backgroundColor,
    borderColor: getColors(variant, AlertButtonState.ACTIVE).borderColor,
  },
  '&:disabled': {
    color: 'backgroundDark.300',
    cursor: 'not-allowed',
    backgroundColor: getColors(variant, AlertButtonState.DISABLED)
      .backgroundColor,
    borderColor: getColors(variant, AlertButtonState.DISABLED).borderColor,
  },
});

export const icon: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignContent: 'center',
  padding: '0',
  border: 'none',
};
