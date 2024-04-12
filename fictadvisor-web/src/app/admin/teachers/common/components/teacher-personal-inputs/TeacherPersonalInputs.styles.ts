import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const wrapper: SxProps<Theme> = {
  flexDirection: 'column',
  gap: '16px',
  padding: '24px 0 16px 0',
};

export const input: SxProps<Theme> = {
  width: '308px',
  '& .MuiInputLabel-shrink': { transform: '' },
};

export const textArea: SxProps<Theme> = {
  width: '655px',
  '& .MuiInputLabel-shrink': { transform: '' },
  '&.MuiFormControl-root': {
    '& .MuiInputBase-root, label': {
      margin: 0,
    },
  },
  mb: '20px',
  '& .MuiInputBase-root': {
    backgroundColor: 'backgroundDark.100',
  },
  '& .MuiFormLabel-root': {
    background: theme.palette.backgroundDark[100],
  },
};

export const avatarInfo: SxProps<Theme> = {
  display: 'flex',
  height: 'fit-content',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: { mobile: '16px', desktopSemiMedium: '18px' },
};

export const avatar: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  height: { mobile: '80px', desktopSemiMedium: '160px' },
  width: { mobile: '80px', desktopSemiMedium: '160px' },
  marginBottom: { mobile: '16px', desktopSemiMedium: '16px' },
  marginTop: { mobile: '6px', desktopSemiMedium: '0' },
  overflow: { desktopSemiMedium: 'hidden' },
  borderRadius: '100%',
  position: 'relative',
  img: {
    cursor: 'pointer',
  },
  '.MuiSvgIcon-root': {
    width: '40px',
    height: '40px',
  },

  '& .MuiBox-root': {
    display: 'none',
    cursor: 'pointer',
    width: { mobile: '24px', desktopSemiMedium: '100%' },
    height: { mobile: '24px', desktopSemiMedium: '40%' },
    opacity: { mobile: 1, desktopSemiMedium: '0.75' },
    position: 'absolute',
    border: {
      mobile: '2px solid',
      desktopSemiMedium: 'none',
    },
    color: 'backgroundDark.100',
    borderRadius: { mobile: '100%', desktopSemiMedium: 0 },
    top: { mobile: 0, desktopSemiMedium: 115 },
    left: { mobile: 44, desktopSemiMedium: 0 },
    transition: 'all 0.1s',
  },

  '&:hover div': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: { mobile: 'grey.300', desktopSemiMedium: 'grey.100' },
  },

  '&:active div': {
    backgroundColor: { mobile: 'primary.200', desktopSemiMedium: 'grey.50' },
  },

  svg: {
    color: 'grey.800',
    width: { mobile: '16px', desktopSemiMedium: '24px' },
    height: { mobile: '16px', desktopSemiMedium: '24px' },
    marginLeft: { mobile: '1px', desktopSemiMedium: 0 },
    marginTop: { mobile: '2px', desktopSemiMedium: '12px' },
  },
};
