import { SxProps, Theme } from '@mui/material/styles';

export const input: SxProps<Theme> = {
  width: '308px',
};

export const textArea: SxProps<Theme> = {
  width: '656px',
  '&.MuiFormControl-root': {
    '& .MuiInputBase-root, label': {
      margin: 0,
    },
  },
  mb: '20px',
};

export const page: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'stretch',
  flexDirection: 'column',
};

export const mainInfo: SxProps<Theme> = {
  width: '546px',
  paddingTop: '24px',
};

export const teacherRow: SxProps<Theme> = {
  display: 'flex',
  gap: '10px',
  width: '592px',

  '> .MuiFormControl-root': {
    width: '200px',
    flexShrink: '0',
  },
};

export const checkboxDropdown: SxProps<Theme> = {
  width: '200px',
  height: '46px',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: 'grey.400',
  borderRadius: '8px',
};
