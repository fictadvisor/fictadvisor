import { SxProps, Theme } from '@mui/material/styles';

export const background: SxProps<Theme> = {
  width: {
    mobile: '100%',
    desktopSemiMedium: '1000px',
  },
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  div: {
    marginLeft: '3px',
    marginBottom: '3px',
    position: 'relative',
    zIndex: '1',
    boxSizing: 'border-box',

    canvas: {
      width: {
        mobile: '90vw !important',
        tablet: 'calc(100vw - 120px) !important',
        desktop: '1000px !important',
        desktopSemiMedium: '1200px !important',
      },
    },
  },

  svg: {
    position: 'absolute',
    right: 0,
    width: '100%',
  },
};
