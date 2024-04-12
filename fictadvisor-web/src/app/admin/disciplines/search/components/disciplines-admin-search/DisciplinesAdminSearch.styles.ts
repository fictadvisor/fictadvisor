import { SxProps, Theme } from '@mui/material/styles';

export const form: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '5px',
};

export const checkboxDropdown: SxProps<Theme> = {
  width: '138px',
  height: '46px',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: 'grey.400',
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
