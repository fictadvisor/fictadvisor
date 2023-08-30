import { isIOS, isSafari } from 'react-device-detect';
import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const mainPageContent: SxProps<Theme> = {
  zIndex: 1,
  maxWidth: '1700px',
  margin: 'auto',
};

export const infoSection: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  position: 'relative',
  overflow: 'hidden',
  flexDirection: {
    mobile: 'column-reverse',
    desktop: 'row',
  },
  alignItems: {
    mobile: 'flex-end',
    desktop: 'flex-start',
  },
};

export const infoSectionContent: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: {
    tablet: '100%',
    desktop: '30%',
  },
  height: {
    tablet: 'fit-content',
  },
  position: 'relative',
  zIndex: 1,
  padding: {
    mobile: '0 10px 0 17px',
    mobileMedium: '0 40px 0 50px',
    desktop: '202px 0 0 80px',
  },
};

export const infoSectionTitle: SxProps<Theme> = {
  typography: {
    mobile: theme.typography.h4Bold,
    tablet: theme.typography.h2Bold,
  },
  display: 'block',
  position: 'relative',
  zIndex: 2,
  width: {
    mobile: '80%',
    tablet: '100%',
    desktopSemiMedium: 'max-content',
  },
  top: {
    mobile: '-24px',
    mobileMedium: '-50px',
    desktop: 0,
  },
};

export const infoSectionParagraph: SxProps<Theme> = {
  padding: {
    mobile: '0 17px 0 0',
    tablet: 0,
  },
  margin: {
    mobile: '0 0 36px',
    mobileMedium: '0 0 44px',
    desktop: '50px 0 45px 0',
  },
  typography: {
    mobile: theme.typography.body1,
    tablet: theme.typography.body2,
  },
  width: {
    tablet: '100%',
    desktop: '157.5%',
  },
};

export const infoSectionImage: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'relative',
  width: {
    tablet: '100%',
    desktop: '75%',
    desktopMedium: '100%',
    desktopSemiMedium: '75%',
  },
  padding: {
    desktop: '89px 0 0',
    desktopSemiMedium: 0,
  },
  right: {
    mobile: '-30px',
    mobileMedium: '-50px',
    desktop: '-15px',
    desktopSemiMedium: '-50px',
    desktopMedium: '-15px',
    desktopLarge: '13px',
  },
  svg: {
    width: {
      mobile: '100%',
      mobileMedium: '80%',
      desktop: 'auto',
    },
    height: {
      mobile: 'auto',
      tablet: '100%',
      desktop: 'auto',
    },
    color: theme.palette.grey['300'],
    clipPath:
      'polygon(58% -10%, 100% 30%, 100% 96%, 88% 96%, 75% 100%, 0% 90%, 2% 75%, 4% 72%, 4% 50%)',
    transition: 'color 225ms cubic-bezier(0.37, 0, 0.63, 1)',
    ...((!isSafari || !isIOS) && {
      '&:hover': {
        color: theme.palette.white.main,
        filter: 'url("#filter_neon")',
      },
    }),
  },
};

export const buttons: SxProps<Theme> = {
  width: {
    mobileSemiMedium: 'auto',
  },
  typography: {
    mobile: theme.typography.body1Bold,
    tablet: theme.typography.buttonBold,
  },
  borderRadius: {
    mobile: '6px',
    tablet: '8px',
  },
  padding: {
    mobile: '8px 16px',
    tablet: '12px 24px',
    desktopSemiMedium: '16px 32px',
    desktop: '12px 24px',
  },
};
export const buttonDesk: SxProps<Theme> = {
  width: 'max-content',
  display: {
    mobile: 'none',
    desktop: 'flex',
  },
  gap: '20px',
};

export const buttonTab: SxProps<Theme> = {
  display: {
    mobile: 'none',
    tablet: 'flex',
    desktop: 'none',
  },
  a: {
    margin: '0 20px 0 0',
  },
};

export const buttonMob: SxProps<Theme> = {
  typography: theme.typography.body1Bold,
  gap: '14px',
  width: '100%',
  display: {
    mobile: 'flex',
    tablet: 'none',
  },
  flexDirection: {
    mobile: 'column',
    mobileMedium: 'row',
  },
};

export const buttonDivider: SxProps<Theme> = {
  border: '1px solid',
  borderColor: theme.palette.backgroundDark[400],
};

export const resourcesSection: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: {
    mobile: '97px 0 40px',
    tablet: '97px 0 127px',
  },
  mobileMedium: {
    marginBottom: '40px',
  },
};

export const resourcesSectionTitle: SxProps<Theme> = {
  typography: {
    mobile: theme.typography.h6Medium,
    tablet: theme.typography.h3Bold,
  },
};

export const resourcesSectionCards: SxProps<Theme> = {
  padding: {
    mobile: '32px 17px',
    tablet: '64px 0 0 0',
  },
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: {
    mobile: '0.5rem',
    desktop: '1rem',
    desktopLarge: '16px',
  },
  maxWidth: '1064px',
};
