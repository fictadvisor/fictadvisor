import { SxProps, Theme } from '@mui/material/styles';

export const tableColumn: SxProps<Theme> = {
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'center',
};

export const button: SxProps<Theme> = {
  borderRadius: '8px',
  width: '157px',
};
export const actions: SxProps<Theme> = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'end',
};
