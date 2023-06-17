import { SxProps, Theme } from '@mui/material/styles';
import { alpha } from '@mui/system';

export const footerContainer: SxProps<Theme> = theme => ({
  display: {
    desktop: 'flex',
    mobile: 'grid',
  },
  overflow: 'hidden',
  width: '100%',
  backgroundColor: alpha(theme.palette.grey[50], 0.62),
  height: {
    desktop: '300px',
    mobile: '286px',
  },
});

export const footerLogoContainer: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: {
    desktop: 'flex-start',
    mobile: 'end',
  },
  marginTop: {
    desktop: '40px',
    mobile: '45px',
  },
  marginLeft: {
    desktop: '80px',
  },
  marginBottom: {
    desktop: '0px',
    mobile: '15px',
  },
  alignItems: {
    desktop: 'stretch',
    mobile: 'center',
  },
  gridRowStart: 2,
  gridColumnStart: 3,
  gridRowEnd: 2,
  gridColumnEnd: 1,
};

export const footerLogo: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  height: {
    desktop: '28px',
    mobile: '22px',
  },
  zIndex: 1,
  marginTop: {
    desktop: '0',
    mobile: '10px',
  },
};

export const signature: SxProps<Theme> = {
  marginTop: '10px',
  textTransform: 'none !important',
  typography: {
    desktop: 'body2',
    mobile: 'overline',
  },
};

export const title: SxProps<Theme> = () => ({
  display: 'flex',
  justifyContent: 'left',
  whiteSpace: 'nowrap',
  color: 'grey.500',
  width: '100%',
  textTransform: 'none !important',
  typography: {
    desktop: 'body2',
    mobile: 'overline',
  },
  height: {
    desktop: '30px',
    mobile: '20px',
  },
  padding: {
    desktop: '2px 12px',
    mobile: '2px 8px',
  },
});

export const mainReferences: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2px',
  typography: 'body2',
  marginTop: {
    desktop: '40px',
    mobile: '10px',
  },
  marginLeft: {
    desktop: '0px',
    mobile: '15px',
  },
  marginRight: {
    desktop: '45px',
  },
  gridRowStart: 1,
  gridColumnStart: 1,
  gridRowEnd: 3,
  gridColumnEnd: 2,
};

export const support: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2px',
  typography: 'body1Medium',
  marginTop: {
    desktop: '40px',
    mobile: '10px',
  },
  marginRight: {
    desktop: '72px',
  },
  marginLeft: {
    desktop: '0',
    mobile: '55px',
  },
  gridRowStart: 1,
  gridColumnStart: 2,
  gridRowEnd: 3,
  gridColumnEnd: 3,
};

export const socialMedia: SxProps<Theme> = {
  display: 'flex',
  typography: 'body1Medium',
  flexDirection: 'column',
  gap: {
    desktop: '2px',
    mobile: '4px',
  },
  marginTop: {
    desktop: '40px',
    mobile: '20px',
  },
  marginRight: {
    desktop: '156px',
  },
  marginLeft: {
    desktop: '0',
    mobile: '55px',
  },
  gridRowStart: 2,
  gridColumnStart: 2,
  gridRowEnd: 3,
  gridColumnEnd: 3,
};

export const socialButtons: SxProps<Theme> = {
  display: 'flex',
  typography: 'body1Bold',
  flexDirection: {
    desktop: 'column',
    mobile: 'row',
  },
};

export const iconLink: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  typography: 'body1Bold',
  flexDirection: 'row',
  width: {
    desktop: 'fit-content',
    mobile: '36px',
  },
};

export const button: SxProps<Theme> = {
  width: 'fit-content',
  paddingLeft: '12px',
  typography: 'body1Medium',
};
