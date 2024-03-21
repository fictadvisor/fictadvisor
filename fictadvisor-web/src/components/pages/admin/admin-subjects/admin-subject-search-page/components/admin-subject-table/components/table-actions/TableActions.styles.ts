import { SxProps, Theme } from '@mui/material/styles';

export const tableBodyItem: SxProps<Theme> = {
  typography: 'body1Medium',
  color: 'white.main',
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
  paddingY: '8px',
};

export const editButton: SxProps<Theme> = {
  width: 'fit-content',
  whiteSpace: 'nowrap',
  borderRadius: '8px',
  marginX: '10px',
};

export const buttonSection: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'right',
};
