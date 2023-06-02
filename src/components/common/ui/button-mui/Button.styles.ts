import { SxProps, Theme } from '@mui/material/styles';

import getColors from '@/components/common/ui/button-mui/utils/constants';

export const button = (color, variant, size): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  color: 'grey.800',
  textTransform: 'none',
  fontWeight: '700',
  minWidth: 'unset',
  minHeight: 'unset',
  gap: '16px',
  width: '100%',

  ...(size === 'small' && {
    padding: '6px 12px',
    fontSize: '14px',
  }),
  ...(size === 'medium' && {
    padding: '12px 24px',
    fontSize: '18px',
  }),
  ...(size === 'large' && {
    padding: '16px 32px',
    fontSize: '18px',
  }),
  ...(variant != 'text' && {
    border: `2px solid`,
    backgroundColor: getColors(color, variant, 'default').backgroundColor,
    borderColor: getColors(color, variant, 'default').borderColor,
    '&:hover': {
      backgroundColor: getColors(color, variant, 'hover').backgroundColor,
      borderColor: getColors(color, variant, 'hover').borderColor,
    },
    '&:focus': {
      backgroundColor: getColors(color, variant, 'focused').backgroundColor,
      borderColor: getColors(color, variant, 'focused').borderColor,
    },
    '&:active': {
      backgroundColor: getColors(color, variant, 'active').backgroundColor,
      borderColor: getColors(color, variant, 'active').borderColor,
    },
    '&:disabled': {
      backgroundColor: getColors(color, variant, 'disabled').backgroundColor,
      borderColor: getColors(color, variant, 'disabled').borderColor,
      color: getColors(color, variant, 'disabled').colorDisabled,
      cursor: 'not-allowed',
    },
  }),

  ...(variant === 'text' && {
    color: 'grey.600',
    backgroundColor: 'transparent',
    border: `1px  solid`,
    borderColor: 'transparent',
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
