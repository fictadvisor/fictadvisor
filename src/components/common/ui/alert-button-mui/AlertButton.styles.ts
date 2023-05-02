import { SxProps, Theme } from '@mui/material/styles';

import getColors from '@/components/common/ui/alert-button-mui/utils/constants';

export const button = (variant, startIcon, endIcon, text): SxProps<Theme> => ({
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
  backgroundColor: getColors(variant, 'default').backgroundColor,
  borderColor: getColors(variant, 'default').borderColor,
  '&:hover': {
    backgroundColor: getColors(variant, 'hover').backgroundColor,
    borderColor: getColors(variant, 'hover').borderColor,
  },
  '&:focus': {
    backgroundColor: getColors(variant, 'focus').backgroundColor,
    borderColor: getColors(variant, 'focus').borderColor,
  },
  '&:active': {
    backgroundColor: getColors(variant, 'active').backgroundColor,
    borderColor: getColors(variant, 'active').borderColor,
  },
  '&:disabled': {
    color: 'backgroundDark.300',
    cursor: 'not-allowed',
    backgroundColor: getColors(variant, 'disabled').backgroundColor,
    borderColor: getColors(variant, 'disabled').borderColor,
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
