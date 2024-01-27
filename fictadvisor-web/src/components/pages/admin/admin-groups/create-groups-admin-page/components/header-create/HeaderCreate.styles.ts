import { SxProps, Theme } from '@mui/material/styles';

export const header: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '48px',
  mb: '20px',
};

export const editName: SxProps<Theme> = {
  width: '100%',
  maxWidth: '657px',
  p: '16px',
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
};

export const button: SxProps<Theme> = {
  width: '171px',
  height: '48px',
  p: '12px 24px',
  borderRadius: '8px',
};
