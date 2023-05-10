import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  margin: 0,
  alignItems: 'center',
};

export const checkBox: SxProps<Theme> = {
  padding: '2px',
};

export const label = (disabled: boolean, label: string): SxProps<Theme> => ({
  color: disabled ? 'grey.400' : 'grey.800',
  marginLeft: label && '8px',
});
