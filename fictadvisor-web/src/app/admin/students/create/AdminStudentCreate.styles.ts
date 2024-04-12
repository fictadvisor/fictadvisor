import { SxProps, Theme } from '@mui/material/styles';

export const selectivesWrapper: SxProps<Theme> = {
  width: '100%',
  maxWidth: '372px',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  pt: '12px',
};

export const body: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '657px',
  width: '100%',
  padding: '24px 0',
  margin: '0 16px 24px 16px',
};
