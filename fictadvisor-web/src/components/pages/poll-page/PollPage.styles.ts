import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const pollPage: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
};

export const pollPageContent: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  flexGrow: '1',
  backgroundColor: theme.palette.backgroundDark[100],
};

export const pollPageContentWrapper: SxProps<Theme> = {
  width: '100%',
};

export const breadcrumbsWrapper: SxProps<Theme> = {
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  marginLeft: '60px',
  marginTop: '16px',

  [theme.breakpoints.down('desktop')]: {
    display: 'none',
  },
};
