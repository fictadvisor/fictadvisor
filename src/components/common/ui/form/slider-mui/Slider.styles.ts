import { SxProps, Theme } from '@mui/material/styles';

export const slider = (size: 'small' | 'medium'): SxProps<Theme> => ({
  color: 'backgroundDark.300',
  ...(size === 'medium' && {
    height: '12px',
  }),
  ...(size === 'small' && {
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
    ...(size === 'medium' && {
      fontSize: '16px',
    }),
    ...(size === 'small' && {
      fontSize: '14px',
    }),
    marginTop: '15px',
  },

  '& .MuiSlider-thumb': {
    ...(size === 'medium' && {
      width: '24px',
      height: '24px',
    }),
    ...(size === 'small' && {
      width: '20px',
      height: '20px',
    }),
    backgroundColor: 'primary.300',

    '&:hover, &.Mui-focusVisible, &.Mui-active': {
      boxShadow: 'none',
    },
  },
});
