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

export const input: SxProps<Theme> = {
  width: '40%',
  padding: '16px',
};
