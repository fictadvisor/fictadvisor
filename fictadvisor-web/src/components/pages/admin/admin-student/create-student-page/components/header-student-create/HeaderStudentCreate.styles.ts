import { SxProps, Theme } from '@mui/material/styles';

export const header: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '16px',
  alignItems: 'center',
  marginBottom: '12px',
};

export const title: SxProps<Theme> = {
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
  padding: '16px',
  width: '100%',
  maxWidth: '657px',
  '& .MuiCardHeader-subheader': {
    typography: 'body1',
    color: 'grey.500',
  },
};

export const button: SxProps<Theme> = {
  borderRadius: '8px',
  maxHeight: '48px',
};
