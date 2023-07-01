import { SxProps, Theme } from '@mui/material/styles';

import { IconButtonSize } from '@/components/common/ui/icon-button-mui/types';

export const button = (size: IconButtonSize): SxProps<Theme> => ({
  ...(size === IconButtonSize.LARGE && {
    padding: '6px',
  }),
  ...(size === IconButtonSize.NORMAL && {
    padding: '4px',
  }),
  '&:hover': {
    backgroundColor: 'backgroundDark.300',
  },
  '&:focus': {
    backgroundColor: 'backgroundDark.400',
    borderColor: 'transparent',
  },
  '&:active': {
    backgroundColor: 'backgroundDark.400',
  },
});

export const iconStyles = (size: IconButtonSize): SxProps<Theme> => ({
  ...(size === IconButtonSize.LARGE && {
    svg: {
      width: '24px',
      height: '24px',
    },
    width: '24px',
    height: '24px',
  }),
  ...(size === IconButtonSize.NORMAL && {
    svg: {
      width: '20px',
      height: '20px',
    },
    width: '20px',
    height: '20px',
  }),
});
