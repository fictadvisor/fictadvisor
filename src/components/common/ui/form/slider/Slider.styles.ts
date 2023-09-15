import { SxProps, Theme } from '@mui/material/styles';

import { SliderSize } from '@/components/common/ui/form/slider/types';

export const slider = (size: SliderSize): SxProps<Theme> => ({
  color: 'backgroundDark.300',
  ...(size === SliderSize.MEDIUM && {
    height: '12px',
  }),
  ...(size === SliderSize.SMALL && {
    height: '8px',
  }),
  '& .MuiSlider-track': {
    border: 'none',
    color: 'primary.300',
  },

  '& .MuiSlider-mark': {
    marginTop: '20px',
    height: '5px',
    width: '1px',
    color: 'grey.700',
  },

  '& .MuiSlider-markLabel': {
    color: 'grey.700',
    ...(size === SliderSize.MEDIUM && {
      fontSize: '16px',
    }),
    ...(size === SliderSize.SMALL && {
      fontSize: '14px',
    }),
    marginTop: '15px',
  },

  '& .MuiSlider-thumb': {
    ...(size === SliderSize.MEDIUM && {
      width: '24px',
      height: '24px',
    }),
    ...(size === SliderSize.SMALL && {
      width: '20px',
      height: '20px',
    }),
    backgroundColor: 'primary.300',

    '&:hover, &.Mui-focusVisible, &.Mui-active': {
      boxShadow: 'none',
    },
  },
});
