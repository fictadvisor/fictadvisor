import { SxProps, Theme } from '@mui/material/styles';

export const header: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  p: '16px',
};

export const button: SxProps<Theme> = {
  borderRadius: '8px',
};

export const title: SxProps<Theme> = {
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
  p: '16px',
  width: '50%',
};

export const input: SxProps<Theme> = {
  width: '40%',
  borderRadius: '8px',
  p: '0 16px',
};

export const body: SxProps<Theme> = {
  display: 'flex',
  gap: '24px',
  p: '24px 16px',
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
  p: '0',
  '& .MuiSwitch-switchBase': {
    p: '0',
    m: '0',
    marginTop: '1px',
    marginLeft: '1px',
    transitionDuration: '400ms',
    '&.Mui-checked': {
      marginLeft: '0',
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
