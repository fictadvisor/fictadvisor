import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  '.MuiDialog-paper': {
    maxWidth: '652px',
    width: '652px',
    paddingBottom: '32px',
    gap: '9px',
    '& .MuiDialogContent-root': {
      display: 'flex',
      justifyContent: 'center',
    },
    backgroundColor: 'backgroundDark.100',
    '&.MuiDialogActions-root': {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  },
};

export const button: SxProps<Theme> = {
  borderRadius: '8px',
};

export const avatarWrapper: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
};

export const avatar: SxProps<Theme> = {
  width: {
    mobile: '160px',
    tablet: '200px',
  },
  height: {
    mobile: '160px',
    tablet: '200px',
  },
};
