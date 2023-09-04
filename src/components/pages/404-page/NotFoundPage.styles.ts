import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

import theme from '@/styles/theme';

export const pageLayout: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundImage: `url("/icons/404-page/leaves-left.svg"),
                     url("/icons/404-page/leaves-right.svg"),
                     url("/icons/404-page/clouds-desktop.svg")`,
  backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
  backgroundPosition: 'left bottom, right bottom, center center',
  backgroundSize: '29%, 29%, 100%',
};

export const notFoundText: SxProps<Theme> = {
  width: { desktop: '353px', mobile: '226px' },
  height: { desktop: '62px', mobile: '54px' },
  textAlign: 'center',
  marginTop: '64px',
  marginBottom: { desktop: '57px', mobile: '44px' },
  typography: { desktop: theme.typography.h5, mobile: theme.typography.body2 },
};

export const frogImage: SxProps<Theme> = {
  position: 'relative',
  img: {
    maxWidth: { desktop: '100%', mobile: '80vw' },
    height: 'auto',
  },
  marginBottom: { desktop: '40px', mobile: '32px' },
  marginLeft: { desktop: '0px', mobile: '5%' },
};

export const pageContent: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'flex-wrap',
  alignItems: 'center',
  flexGrow: 1,
};

export const buttons: SxProps<Theme> = {
  alignItems: 'center',
  justifyContent: 'center',
  display: { desktop: 'flex', mobile: 'grid' },
  gap: { desktop: '18px', mobile: '10px' },
  paddingTop: { desktop: '40px', mobile: '32px' },
  marginRight: { mobile: '30px', desktop: '0px' },
  marginLeft: { mobile: '30px', desktop: '0px' },
  paddingBottom: { desktop: '142px', mobile: '177px' },
};

export const button: SxProps<Theme> = {
  maxHeight: '56px',
  whiteSpace: 'nowrap',
  borderRadius: '8px',
  maxWidth: '300px',
};
