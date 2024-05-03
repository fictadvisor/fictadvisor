import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const wrapper: SxProps<Theme> = {
  [theme.breakpoints.down('desktop')]: {
    width: '100%',
    animationName: 'appear',
    animationDuration: '0.3s',
  },

  '@keyframe appear': {
    from: {
      opacity: 0,
    },

    to: {
      opacity: 1,
    },
  },
};
