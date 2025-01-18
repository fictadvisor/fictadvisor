import { SxProps, Theme } from '@mui/material/styles';

import getColors from './utils/get-colors';
import { ButtonColor, ButtonSize, ButtonState, ButtonVariant } from './types';

export const button = (
  color: ButtonColor,
  variant: ButtonVariant,
  size: ButtonSize,
  loading: boolean = false,
): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'grey.800',
  textTransform: 'none',
  fontWeight: '700',
  whiteSpace: 'nowrap',
  minWidth: 'unset',
  minHeight: 'unset',
  gap: '16px',
  width: '100%',

  ...(size === ButtonSize.SMALL && {
    padding: '6px 12px',
    fontSize: '14px',
    borderRadius: '6px',
  }),
  ...(size === ButtonSize.MEDIUM && {
    padding: '12px 24px',
    fontSize: '18px',
    borderRadius: '8px',
  }),
  ...(size === ButtonSize.LARGE && {
    padding: '16px 32px',
    fontSize: '18px',
    borderRadius: '8px',
  }),
  ...(variant !== ButtonVariant.TEXT && {
    borderRadius: '8px',
    border: `2px solid`,
    backgroundColor: getColors(color, variant, ButtonState.DEFAULT)
      .backgroundColor,
    borderColor: getColors(color, variant, ButtonState.DEFAULT).borderColor,
    '&:hover': {
      backgroundColor: getColors(color, variant, ButtonState.HOVER)
        .backgroundColor,
      borderColor: getColors(color, variant, ButtonState.HOVER).borderColor,
    },
    '&:focus': {
      backgroundColor: getColors(color, variant, ButtonState.FOCUSED)
        .backgroundColor,
      borderColor: getColors(color, variant, ButtonState.FOCUSED).borderColor,
    },
    '&:active': {
      backgroundColor: getColors(color, variant, ButtonState.ACTIVE)
        .backgroundColor,
      borderColor: getColors(color, variant, ButtonState.ACTIVE).borderColor,
    },
    '&:disabled': {
      backgroundColor: getColors(color, variant, ButtonState.DISABLED)
        .backgroundColor,
      borderColor: getColors(color, variant, ButtonState.DISABLED).borderColor,
      color: getColors(color, variant, ButtonState.DISABLED).colorDisabled,
      cursor: 'not-allowed',
    },
    ...(loading && {
      cursor: 'not-allowed',
      pointerEvents: 'none',
      backgroundColor: getColors(color, variant, ButtonState.DISABLED)
        .backgroundColor,
      borderColor: getColors(color, variant, ButtonState.DISABLED).borderColor,
      color: getColors(color, variant, ButtonState.DISABLED).colorDisabled,
    }),
  }),

  ...(variant === ButtonVariant.TEXT && {
    color: 'grey.600',
    backgroundColor: 'transparent',
    border: `1px  solid`,
    borderColor: 'transparent',
    borderRadius: '2px',
    '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline 1px',
      textUnderlineOffset: '2px',
      textDecorationThickness: '0.5px',
    },
    '&:focus': {
      color: 'grey.700',
      backgroundColor: 'transparent',
      borderColor: 'grey.700',
      textDecoration: 'unset',
    },
    '&:active': {
      backgroundColor: 'transparent',
      color: 'grey.800',
    },
    '&:disabled': {
      backgroundColor: 'transparent',
      textDecoration: 'unset',
      color: 'grey.300',
      cursor: 'not-allowed',
    },
    ...(loading && {
      backgroundColor: 'transparent',
      textDecoration: 'unset',
      pointerEvents: 'none',
      color: 'grey.300',
      cursor: 'not-allowed',
    }),
  }),
});

export const icon: SxProps<Theme> = {
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignContent: 'center',
  padding: '0',
  border: 'none',
  svg: {
    width: '24px',
    height: '24px',
  },
};
