import { SxProps, Theme } from '@mui/material/styles';

import { SwitchLabelPlacement } from './types';

export const wrapper: SxProps<Theme> = {
  margin: 0,
  alignItems: 'center',
};

export const label = (
  label: string,
  labelPlacement: string,
): SxProps<Theme> => ({
  marginLeft: label && labelPlacement === SwitchLabelPlacement.END ? '8px' : 0,
  marginRight:
    label && labelPlacement === SwitchLabelPlacement.START ? '8px' : 0,
  typography: {
    desktop: 'body2',
    mobile: 'body1',
  },
});

export const switchStyle: SxProps<Theme> = {
  width: {
    desktop: '40px',
    mobile: '36px',
  },
  height: {
    desktop: '20px',
    mobile: '18px',
  },
  padding: '0px',
  '& .MuiSwitch-switchBase': {
    padding: '0px',
    margin: '0px',
    marginTop: '1px',
    marginLeft: '1px',
    transitionDuration: '400ms',
    '&.Mui-checked': {
      marginLeft: {
        desktop: '0px',
        mobile: '-1px',
      },
      '& + .MuiSwitch-track': {
        backgroundColor: 'primary.logo',
        opacity: 1,
        border: 0,
      },
      '& .MuiSwitch-thumb': {
        color: 'grey.800',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    color: 'backgroundDark.300',
    width: {
      desktop: '18px',
      mobile: '16px',
    },
    height: {
      desktop: '18px',
      mobile: '16px',
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: '100px',
    backgroundColor: 'backgroundDark.600',
    opacity: 1,
  },
};
