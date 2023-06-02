import { SxProps, Theme } from '@mui/material/styles';

import getColor from '@/components/common/ui/icon-button-mui/utils/constants';

export const button = (shape, color, size): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'grey.800',
  minWidth: 'unset',
  minHeight: 'unset',
  padding: ' 6px',
  ...(shape === 'circle' && {
    ...(size === 'normal' && {
      borderRadius: '18px',
    }),
    ...(size === 'large' && {
      borderRadius: '24px',
    }),
  }),

  ...(shape === 'square' && {
    borderRadius: '4px',
  }),

  backgroundColor: getColor(color, 'default'),
  border: `1px transparent solid`,
  '&:hover': {
    backgroundColor: getColor(color, 'hover'),
  },
  '&:focus': {
    backgroundColor: getColor(color, 'focused'),
    borderColor: getColor(color, 'border'),
  },
  '&:active': {
    backgroundColor: getColor(color, 'active'),
  },
  '&:disabled': {
    color: 'grey.200',
    backgroundColor: 'transparent',
    cursor: 'not-allowed',
    border: 'transparent',
  },
});

export const iconStyles = (size): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignContent: 'center',
  padding: '0',
  border: 'none',
  ...(size === 'large' && {
    width: '32px',
    height: '32px',
    svg: {
      width: '32px',
      height: '32px',
    },
  }),
  ...(size === 'normal' && {
    svg: {
      width: '24px',
      height: '24px',
    },
    width: '24px',
    height: '24px',
  }),
});
