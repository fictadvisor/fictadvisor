import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

import theme from '@/styles/theme';

export const transferCaptainPopup: SxProps<Theme> = {
  '.MuiDialog-paper': {
    maxWidth: '782px',
    height: 'auto',
    backgroundColor: 'backgroundDark.100',
    padding: {
      mobile: '5px 10px 20px',
      desktop: '20px',
    },
  },
  '& .MuiTypography-root': {
    paddingTop: 0,
    paddingBottom: {
      mobile: '6px',
      desktop: '16px',
    },
    typography: {
      mobile: theme.typography.body2Medium,
      desktop: theme.typography.h6Bold,
    },
  },
  '& .MuiDialogContent-root': {
    pb: {
      mobile: '12px',
      desktop: '24px',
    },
  },

  '& .MuiDialogActions-root': {
    gap: '20px',
    justifyContent: {
      mobile: 'center',
      desktop: 'flex-end',
    },
  },
};

export const gridWrapper: SxProps<Theme> = {
  height: '360px',
  pr: '4px',
  borderRadius: '6px',
  mt: {
    mobile: '5px',
    desktop: '9px',
  },
  overflow: 'auto',

  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '2px',
  },
};

export const row = (isSelected: boolean) => ({
  backgroundColor: isSelected ? 'grey.300' : 'transparent',
  cursor: 'pointer',
  '& .MuiGrid-root.MuiGrid-item': {
    '&:nth-of-type(1)': {
      gap: {
        mobile: '8px',
        desktop: '26px',
      },
    },
  },
  '& .MuiTypography-root': {
    '&.email': {
      textAlign: 'left',
    },
    '&.name': {
      whiteSpace: {
        mobile: 'nowrap',
        desktop: 'wrap',
      },
      textAlign: 'left',
      maxWidth: {
        mobile: '100%',
        desktop: '180px',
      },
    },
  },
});

export const canselButton: SxProps<Theme> = {
  width: 'fit-content',
  p: '6px 16px',
};

export const transferButton: SxProps<Theme> = {
  border: 'none',
  width: '127px',
  p: '6px 12px',
  marginLeft: '0px !important',
  marginRight: '18px',
  typography: 'body1Bold',
  borderRadius: '6px',
  gap: '6px',
};
