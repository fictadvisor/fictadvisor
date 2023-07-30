import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const card: SxProps<Theme> = {
  display: 'grid',
  width: '100%',
  gridTemplateRows: {
    mobile: 'auto 1fr auto auto auto',
    desktopSemiMedium: 'auto 1fr 1fr auto auto',
  },
  gridTemplateColumns: {
    mobile: '80px 1fr',
    mobileMedium: 'auto auto 1fr',
    desktopSemiMedium: 'auto auto minmax(296px, 1fr)',
  },
  padding: {
    mobile: '12px',
    mobileMedium: '24px',
    desktopSemiMedium: '40px',
  },
};

export const photo: SxProps<Theme> = {
  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRowStart: 1,
  gridRowEnd: {
    mobile: 2,
    mobileMedium: 3,
    desktopSemiMedium: 4,
  },
  width: 'fit-content',
  paddingRight: {
    mobile: '12px',
    mobileMedium: '32px',
  },
};

export const image: SxProps<Theme> = {
  width: {
    mobile: '68px',
    mobileMedium: '140px',
    desktopSemiMedium: '200px',
  },
  borderRadius: '50%',
};

export const nameAndRating = {
  display: 'flex',
  minWidth: 'unset',
  width: {
    mobile: '90%',
    mobileMedium: '100%',
  },
  gridColumnStart: 2,
  gridColumnEnd: {
    mobile: 4,
    mobileMedium: 3,
  },
  gridRowStart: 1,
  gridRowEnd: 2,
  flexDirection: 'column',
  alignItems: 'flex-start',
  overflowWrap: 'anywhere',
  padding: {
    mobile: '1px',
    desktopSemiMedium: '0 42px 24px 0',
  },
  gap: {
    mobile: '2px',
    mobileMedium: '8px',
  },
};

export const name: SxProps<Theme> = {
  typography: {
    mobile: 'buttonBold',
    mobileMedium: 'h4Medium',
  },
};

export const tags: SxProps<Theme> = {
  gridColumnStart: {
    mobile: 1,
    mobileMedium: 2,
  },
  gridColumnEnd: {
    mobile: 4,
    desktopSemiMedium: 3,
  },
  gridRowStart: 2,
  gridRowEnd: 3,
  display: 'flex',
  flexDirection: 'row',
  height: 'fit-content',
  gap: '8px',
  width: {
    mobile: '90%',
    desktopSemiMedium: '100%',
  },
  padding: {
    mobile: '14px 0 8px 0',
    mobileMedium: '14px 0 0 0',
    desktopSemiMedium: '0 42px 26px 0',
  },
};

export const tag: SxProps<Theme> = {
  typography: 'body1',
};

export const info: SxProps<Theme> = {
  maxWidth: {
    mobile: '90%',
    desktopSemiMedium: '700px',
  },
  gridColumnStart: {
    mobile: 1,
    desktopSemiMedium: 2,
  },
  gridColumnEnd: {
    mobile: 4,
    desktopSemiMedium: 3,
  },
  gridRowStart: 3,
  gridRowEnd: 4,
  padding: {
    mobile: 'unset',
    mobileMedium: '0 unset 0 0',
    desktopSemiMedium: '0 42px 0 0',
  },
  marginTop: {
    mobile: '8px',
    desktopSemiMedium: 0,
  },
  typography: {
    mobile: 'overline',
    desktopSemiMedium: 'body1',
  },
};

export const contactsButton: SxProps<Theme> = {
  gridColumnStart: 1,
  gridColumnEnd: 4,
  gridRowStart: 4,
  gridRowEnd: 5,
  button: {
    color: 'grey.600',
    width: 'fit-content',
    paddingLeft: 0,
    typography: 'body1Medium',
    display: {
      mobile: 'flex',
      desktopSemiMedium: 'none',
    },
    border: '2px transparent',
    '&:hover': {
      textDecoration: 'none',
      border: '2px transparent',
    },
    '&:focus:not(:active)': {
      border: '2px transparent',
    },
    '&:active': {
      textDecoration: 'none',
      border: '2px transparent',
    },
  },
};

export const contacts = (status: string) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  gridColumnStart: 3,
  gridColumnEnd: 4,
  gridRowStart: 1,
  ...(status === 'hidden' && {
    position: 'relative',
    width: 'fit-content',
    gridRowEnd: 5,
    height: '100%',
    overflow: 'hidden',
    padding: '12px 5% 12px 42px',
    display: {
      mobile: 'none',
      desktopSemiMedium: 'flex',
    },
  }),
  ...(status === 'shown' && {
    width: 'fit-content',
    height: 'fit-content',
    paddingLeft: {
      mobile: 'unset',
      desktopSemiMedium: '42px',
    },
    borderRight: 'unset',
    gridColumnStart: 1,
    gridColumnEnd: 4,
    gridRowStart: 5,
    gridRowEnd: {
      mobile: 6,
      desktopSemiMedium: 4,
    },
    border: {
      mobile: 'unset',
      mobileMedium: 'none',
    },
  }),
});

export const contactsItem: SxProps<Theme> = {
  '&:nth-of-type(n+1)::after': {
    top: '1px',
    height: '130px',
  },
  '&:nth-of-type(n+4)::after': {
    top: '1px',
    height: '100%',
  },
  '&::after': {
    display: {
      mobile: 'none',
      desktopSemiMedium: 'flex',
    },
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '100%',
    width: '2px',
    backgroundColor: theme.palette.white['main'],
    color: theme.palette.white['main'],
  },
};
