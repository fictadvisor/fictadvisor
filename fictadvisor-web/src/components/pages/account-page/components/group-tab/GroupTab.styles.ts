import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

export const progress: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const sortButton: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  mb: '20px',
};

export const groupInfo: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const leaveButton: SxProps<Theme> = {
  width: '184px',
  height: '45px',
  whiteSpace: 'nowrap',
  marginBottom: '20px',
};
