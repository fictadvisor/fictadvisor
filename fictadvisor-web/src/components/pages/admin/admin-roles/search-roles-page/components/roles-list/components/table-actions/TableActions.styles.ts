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

export const trashIcon: SxProps<Theme> = {
  padding: '6px',
  borderRadius: '50%',
};
export const actionsWrapper: SxProps<Theme> = {
  padding: '0 16px 0  0',
  width: '214px',
};
export const actions: SxProps<Theme> = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'end',
};
