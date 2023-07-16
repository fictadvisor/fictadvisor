import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  display: 'flex',
  gap: '16px',
};

export const commentsWrapper: SxProps<Theme> = {
  maxWidth: '750px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

export const dropdown = {
  marginBottom: '12px',
};
