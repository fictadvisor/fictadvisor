import { SxProps, Theme } from '@mui/material/styles';

import typography from '@/styles/theme/constants/typography';

export const boxCircle: SxProps<Theme> = {
  position: 'relative',
  display: 'inline-flex',
  '.MuiCircularProgress-svg': {
    strokeLinecap: 'round',
  },
  '.MuiCircularProgress-root': {
    width: {
      mobile: '150px !important',
      desktopSemiMedium: '200px !important',
    },
    height: {
      mobile: '150px !important',
      desktopSemiMedium: '200px !important',
    },
  },
};

export const boxCounter: SxProps<Theme> = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const progressFront = (value): SxProps<Theme> => ({
  ...progressColor(value),
});

export const progressBack: SxProps<Theme> = {
  color: 'backgroundDark.300',
  position: 'absolute',
  left: 0,
};

export const textCounter = (value): SxProps<Theme> => ({
  typography: {
    mobile: typography.h5,
    desktopSemiMedium: typography.h3SemiBold,
  },
  ...progressColor(value),
});

const progressColor = (value): SxProps<Theme> => ({
  color: value < 40 ? 'error.400' : value <= 70 ? 'amber.500' : 'green.700',
});
