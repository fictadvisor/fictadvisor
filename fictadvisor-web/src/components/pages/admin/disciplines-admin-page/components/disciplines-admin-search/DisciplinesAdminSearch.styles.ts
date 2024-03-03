import { SxProps, Theme } from '@mui/material/styles';

export const header: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
};

export const form: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '5px',
};

export const input: SxProps<Theme> = {
  '& .MuiInputBase-root': {
    width: '344px',
    height: '46px',
  },
};

export const checkboxDropdown: SxProps<Theme> = {
  width: '138px',
  height: '46px',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: 'grey.400',
  borderRadius: '8px',
};

export const divider: SxProps<Theme> = {
  borderColor: 'backgroundDark.600',
  height: '46px',
};

export const button: SxProps<Theme> = {
  width: '135px',
  height: '48px',
  borderRadius: '8px',
};

export const dropdown: SxProps<Theme> = {
  width: '150px',
  display: 'flex',
  flexDirection: 'row',
  '& .MuiAutocomplete-tag': {
    display: 'inline-flex',
  },
};
