import { SxProps, Theme } from '@mui/material/styles';

export const header: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
};

export const button: SxProps<Theme> = {
  borderRadius: '8px',
};

export const title: SxProps<Theme> = {
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
  padding: '16px',
  width: '50%',
};

export const input: SxProps<Theme> = {
  width: '40%',
  borderRadius: '8px',
  padding: '0px 16px',
};

export const body: SxProps<Theme> = {
  display: 'flex',
  gap: '24px',
  padding: '24px 16px',
};

export const inputsWrapper: SxProps<Theme> = {
  width: '100%',
  maxWidth: '308px',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
};
