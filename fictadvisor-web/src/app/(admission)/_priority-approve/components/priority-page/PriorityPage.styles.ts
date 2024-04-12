import { SxProps, Theme } from '@mui/material/styles';

export const item: SxProps<Theme> = {
  marginTop: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '16px',
  width: { tablet: '480px', mobile: '100%' },
};

export const divider: SxProps<Theme> = {
  borderColor: 'grey.400',
  color: 'grey.500',
  marginBottom: '8px',
};
