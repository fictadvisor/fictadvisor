import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const wrapper: SxProps<Theme> = {
  paddingLeft: {
    desktopSemiMedium: '124px',
    desktop: '30px',
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [theme.breakpoints.down('desktop')]: {
    maxWidth: '100vw',
    width: '100vw',
    margin: 0,
    animationName: '$appear',
    animationDuration: '0.3s',
  },

  '@keyframes appear': {
    from: {
      opacity: 0,
    },

    to: {
      opacity: 1,
    },
  },
};

export const successWrapper: SxProps<Theme> = {
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const answersWrapper: SxProps<Theme> = {
  width: '632px',

  [theme.breakpoints.down('desktop')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
    width: '100%',
    height: '100%',
  },
};

export const chevronIcon: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
};

export const loaderWrapper: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const answersSavedWrapper: SxProps<Theme> = {
  minHeight: '100vh',
  minWidth: '100%',
  width: '100vw',
  height: '100%',
  margin: 0,
};

export const toQuestionsList: SxProps<Theme> = {
  width: '100%',
  height: '52px',
  borderBottom: `1px solid ${theme.palette.backgroundDark[400]}`,
  transition: '0.3s',
  padding: '0 15px',
  display: 'none',

  '&:hover': {
    background: theme.palette.backgroundDark[300],
  },
  '&:active': {
    background: theme.palette.backgroundDark[400],
  },

  [theme.breakpoints.down('desktop')]: {
    display: 'flex',
    alignItems: 'center',
  },
};

export const button: SxProps<Theme> = {
  width: 'fit-content',
  borderRadius: '8px',

  [theme.breakpoints.down('desktop')]: {
    width: '100%',
    marginBottom: '38px',
  },
};

export const questionName: SxProps<Theme> = {
  margin: '0 auto',
  width: 'fit-content',
  typography: theme.typography.body1Bold,
};
