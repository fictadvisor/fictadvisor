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
};

export const button: SxProps<Theme> = {
  borderRadius: '8px',
};

export const input: SxProps<Theme> = {
  width: '40%',
  padding: '16px',
};

export const divider: SxProps<Theme> = {
  margin: '16px',
  height: '1px',
  width: '50%',
  borderColor: 'backgroundDark.400',
};
