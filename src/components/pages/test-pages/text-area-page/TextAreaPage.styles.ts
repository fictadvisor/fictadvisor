import { CSSProperties } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  backgroundColor: 'backgroundDark.50',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '50px',
};

export const form: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '50px',
  width: '400px',
};
