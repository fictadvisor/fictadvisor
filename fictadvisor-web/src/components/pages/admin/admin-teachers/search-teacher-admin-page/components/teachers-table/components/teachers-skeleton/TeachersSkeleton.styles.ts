import { SxProps, Theme } from '@mui/material/styles';

export const bodyItem: SxProps<Theme> = {
  typography: 'body1Medium',
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
};

export const tag: SxProps<Theme> = {
  height: '35px',
  width: '35px',
};
export const longTag: SxProps<Theme> = {
  width: '60px',
  height: '35px',
};

export const tableColumn: SxProps<Theme> = {
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'center',
};

export const button: SxProps<Theme> = {
  borderRadius: '8px',
  width: '157px',
  height: '30px',
};
