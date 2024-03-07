import { SxProps, Theme } from '@mui/material/styles';

export const tableColumn: SxProps<Theme> = {
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'center',
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

export const buttonSection: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'right',
};
export const button: SxProps<Theme> = {
  width: 'fit-content',
  whiteSpace: 'nowrap',
  borderRadius: '8px',
  marginX: '10px',
};
