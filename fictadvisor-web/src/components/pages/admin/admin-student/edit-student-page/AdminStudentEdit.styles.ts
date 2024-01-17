import { SxProps, Theme } from '@mui/material/styles';

export const body: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '24px 16px',
  width: '100%',
  maxWidth: '689px',
};

export const divider: SxProps<Theme> = {
  height: '1px',
  width: '100%',
  marginY: '10px',
  backgroundColor: 'backgroundDark.600',
};

export const editButton: SxProps<Theme> = {
  width: '100%',
  maxWidth: '242px',
};
