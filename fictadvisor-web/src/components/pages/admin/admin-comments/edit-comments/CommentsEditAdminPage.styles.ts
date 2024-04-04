import { SxProps, Theme } from '@mui/material/styles';

export const title: SxProps<Theme> = {
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
  padding: '16px',
  width: '60%',
  '& .MuiCardHeader-subheader': {
    typography: 'body1',
    color: 'grey.500',
    display: '-webkit-box',
    WebkitLineClamp: '1',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
  },
};

export const body: SxProps<Theme> = {
  display: 'flex',
  gap: '36px',
  padding: '24px 16px',
  '.MuiInputBase-root.MuiOutlinedInput-root, .MuiFormLabel-root.MuiInputLabel-root':
    {
      marginTop: 0,
      height: 'max-content',
    },
};

export const textArea: SxProps<Theme> = {
  width: '60%',
  '&.MuiFormControl-root': {
    '&.MuiInputBase-root, label': {
      margin: 0,
    },
  },
};
