import { SxProps, Theme } from '@mui/material/styles';

export const dropdown: SxProps<Theme> = {
  width: '100%',
  maxWidth: '188px',
};

export const checkboxesDropdown: SxProps<Theme> = {
  width: '100%',
  maxWidth: '111px',
};

export const search: SxProps<Theme> = {
  width: '100%',
  maxWidth: '344px',
};

export const filterBar: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'start',
  gap: '8px',
};

export const header: SxProps<Theme> = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
};

export const button: SxProps<Theme> = {
  width: '135px',
  height: '48px',
  borderRadius: '8px',
};

export const divider: SxProps<Theme> = {
  height: '46px',
  width: '1px',
  background: 'backgroundDark.200',
};
