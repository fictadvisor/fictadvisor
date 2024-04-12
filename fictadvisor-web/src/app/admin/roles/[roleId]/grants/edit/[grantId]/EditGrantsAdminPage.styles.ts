import { SxProps, Theme } from '@mui/material/styles';

export const body: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  padding: '24px 16px',
};

export const switchWrapper: SxProps<Theme> = {
  display: 'flex',
  gap: '16px',
};

export const switchStyle: SxProps<Theme> = {
  width: '40px',
  height: '20px',
  padding: '0px',
  '& .MuiSwitch-switchBase': {
    padding: '0px',
    margin: '0px',
    marginTop: '1px',
    marginLeft: '1px',
    transitionDuration: '400ms',
    '&.Mui-checked': {
      marginLeft: '0px',
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
    width: '18px',
    height: '18px',
  },
  '& .MuiSwitch-track': {
    borderRadius: '100px',
    backgroundColor: 'backgroundDark.600',
    opacity: 1,
  },
};
