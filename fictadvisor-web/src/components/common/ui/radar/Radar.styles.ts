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
    width: `calc(76% + 60px)`,
    height: `calc(76% + 60px)`,
    maxWidth: { mobile: '455px', desktopSemiMedium: '510px' },
    maxHeight: { mobile: '455px', desktopSemiMedium: '510px' },
    boxSizing: 'border-box',

    canvas: {
      width: '100% !important',
      height: '100% !important',
    },
  },

  svg: {
    position: 'absolute',
    right: 0,
    width: '100%',
  },
};
