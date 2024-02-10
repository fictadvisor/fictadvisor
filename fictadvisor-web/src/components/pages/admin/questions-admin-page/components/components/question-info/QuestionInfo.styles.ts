import { SxProps, Theme } from '@mui/material/styles';

export const infoSection: SxProps<Theme> = {
  width: '660px',
  marginTop: '24px',
};

export const textarea: SxProps<Theme> = {
  '.MuiInputBase-root': {
    marginTop: '0px',
    backgroundColor: '#1E1E1E',
  },

  '.MuiFormLabel-root': {
    background: '#1E1E1E',
  },

  label: {
    marginTop: '0px',
  },

  textarea: {
    fontSize: '14px',
  },
};

export const input: SxProps<Theme> = {
  '.MuiFormLabel-root': {
    lineHeight: '1rem',
  },
};

export const divider: SxProps<Theme> = {
  borderColor: 'backgroundDark.600',
};

export const switchWrapper: SxProps<Theme> = {
  width: '166px',
  margin: 0,
  alignItems: 'center',
};

export const switchLabel: SxProps<Theme> = {
  marginRight: '8px',
  typography: 'body2',
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
