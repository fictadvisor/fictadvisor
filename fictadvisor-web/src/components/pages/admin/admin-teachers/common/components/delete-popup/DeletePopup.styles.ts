import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  '.MuiDialog-paper': {
    maxWidth: '420px',
    width: '420px',
    paddingBottom: '16px',
    gap: '9px',
    '& .MuiDialogContent-root': {
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '8px',
    },
    backgroundColor: 'backgroundDark.100',
    '&.MuiDialogActions-root': {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  },
  '& .MuiDialogTitle-root': {
    height: '0',
    padding: '0',
    '& .MuiTypography-body1': {
      padding: '0',
    },
  },
};
export const headerWrapper: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  mb: '24px',
};

export const button: SxProps<Theme> = {
  borderRadius: '8px',
};
