import { SxProps, Theme } from '@mui/material/styles';

export const selectivesWrapper: SxProps<Theme> = {
  width: '100%',
  maxWidth: '372px',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
};

export const body: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '657px',
  width: '100%',
  padding: '24px 0px',
  margin: '24px 16px',
};

export const divider: SxProps<Theme> = {
  mb: '16px',
  height: '1px',
  width: '100%',
  backgroundColor: 'backgroundDark.600',
};
