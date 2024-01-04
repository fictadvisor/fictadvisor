import { SxProps, Theme } from '@mui/material/styles';

export const progressFront: SxProps<Theme> = {
  '.MuiCircularProgress-svg': {
    strokeLinecap: 'round',
  },
  color: 'primary.300',
};

export const progressBack: SxProps<Theme> = {
  color: 'backgroundDark.200',
  position: 'absolute',
};
