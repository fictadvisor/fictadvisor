import { SxProps, Theme } from '@mui/material/styles';

export const textArea: SxProps<Theme> = {
  backgroundColor: 'backgroundDark.200',
  borderRadius: '8px',
  p: '12px',
  '& div': {
    color: 'grey.500',
  },
  '&:hover': {
    div: {
      color: 'grey.700',
    },
  },
  width: '100%',
};

export const error: SxProps<Theme> = {
  fontSize: '11px',
  color: 'error.500',
  pl: '16px',
};
