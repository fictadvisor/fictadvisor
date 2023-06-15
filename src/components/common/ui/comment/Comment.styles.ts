import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  wordWrap: 'break-word',
  height: '100%',
  padding: '11px 16px 12px 16px',
  backgroundColor: 'backgroundDark.200',
  borderRadius: '4px',
};

export const text: SxProps<Theme> = {
  marginBottom: '2px',
  textAlign: 'justify',
  typography: 'body1',
};

export const date: SxProps<Theme> = {
  height: '17px',
  width: '100%',
  typography: 'body1',
  textAlign: 'right',
  color: 'grey.400',
};
