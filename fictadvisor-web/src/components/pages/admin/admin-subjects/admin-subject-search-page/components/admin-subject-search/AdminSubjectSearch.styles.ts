import { SxProps, Theme } from '@mui/material/styles';

export const filterBar: SxProps<Theme> = {
  width: '35%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '16px',
  padding: '16px',
};

export const header: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const button: SxProps<Theme> = {
  width: '135px',
  height: '48px',
  borderRadius: '8px',
};
