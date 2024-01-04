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
