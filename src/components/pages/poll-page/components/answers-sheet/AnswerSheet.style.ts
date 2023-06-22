import { SxProps, Theme } from '@mui/material/styles';

export const textArea: SxProps<Theme> = {
  width: {
    mobile: '100%',
    desktop: '500px',
    desktopMedium: '632px',
  },
  '& .MuiInputBase-root': {
    height: {
      mobile: '228px',
      desktop: '120px',
    },
  },
};
