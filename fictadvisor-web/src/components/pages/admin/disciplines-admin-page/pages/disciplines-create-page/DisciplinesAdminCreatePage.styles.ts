import { SxProps, Theme } from '@mui/material/styles';

export const header: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const editName: SxProps<Theme> = {
  width: '656px',
  p: '16px',
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
};

export const name: SxProps<Theme> = {
  typography: 'body2',
  color: '#bbbbbb',
  fontWeight: 500,
};

export const button: SxProps<Theme> = {
  height: '48px',
  p: '12px 24px',
  borderRadius: '8px',
};

export const input: SxProps<Theme> = {
  width: '308px',
};

export const textArea: SxProps<Theme> = {
  width: '655px',
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
