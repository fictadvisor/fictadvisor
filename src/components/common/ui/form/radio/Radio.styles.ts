import { alpha, SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

import { FieldState } from '../common/types';

export const radioColour = (state: FieldState) => {
  return state === FieldState.ERROR ? 'error.500' : 'grey.800';
};

export const radio = (state: FieldState): SxProps<Theme> => ({
  width: '20px',
  height: '20px',
  color: radioColour(state),
  '&.Mui-checked': {
    color: radioColour(state),
  },
  '&.Mui-disabled': {
    color: 'grey.300',
  },
  '&:hover': {
    '&:before': {
      width: '10px',
      height: '10px',
      borderRadius: '10px',
      background: `${alpha(theme.palette.grey[800], 0.5)}`,
      position: 'absolute',
      content: '""',
    },
  },
  '& .MuiIconButton-label': {
    color: radioColour(state),
  },
});

export const label = (disabled: boolean, label: string): SxProps<Theme> => ({
  color: disabled ? 'grey.400' : 'grey.800',
  marginLeft: label && '8px',
});

export const wrapper: SxProps<Theme> = {
  display: 'flex',
  width: 'fit-content',
  alignItems: 'center',
  margin: 0,
};
