import { SxProps, Theme } from '@mui/material/styles';

export const header: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
};

export const title: SxProps<Theme> = {
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
  padding: '16px',
  width: '50%',
  '& .MuiCardHeader-subheader': {
    typography: 'body1',
    color: 'grey.500',
  },
};

export const button: SxProps<Theme> = {
  borderRadius: '8px',
};

export const body: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  padding: '24px 16px',
};

export const inputsWrapper: SxProps<Theme> = {
  width: '100%',
  maxWidth: '308px',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
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
