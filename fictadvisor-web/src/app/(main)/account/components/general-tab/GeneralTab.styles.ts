import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const container: SxProps<Theme> = {
  display: 'flex',
  width: '100%',
  gap: '8%',
  flexDirection: { mobile: 'column-reverse', desktopSemiMedium: 'row' },
};

export const personalInfo: SxProps<Theme> = {
  width: {
    mobile: '100%',
    desktopSemiMedium: '60%',
    desktopMedium: '45%',
  },
};

export const form: SxProps<Theme> = {
  width: '100%',
};

export const avatar: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  height: { mobile: '68px', desktopSemiMedium: '136px' },
  width: { mobile: '68px', desktopSemiMedium: '136px' },
  marginBottom: { mobile: '16px', desktopSemiMedium: '16px' },
  marginTop: { mobile: '6px', desktopSemiMedium: '0' },
  overflow: { desktopSemiMedium: 'hidden' },
  borderRadius: '100%',
  position: 'relative',
  img: {
    cursor: 'pointer',
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
    top: { mobile: 0, desktopSemiMedium: 82 },
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

export const input: SxProps<Theme> = {
  marginBottom: { mobile: '22px', desktopSemiMedium: '24px' },
  marginTop: '1.5%',
};

export const avatarAndTelegramInfo: SxProps<Theme> = {
  display: 'flex',
  height: 'fit-content',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: { mobile: '16px', desktopSemiMedium: '18px' },
};

export const telegramButton: SxProps<Theme> = {
  width: 'fit-content',
};

export const divider: SxProps<Theme> = {
  paddingBottom: '20px',
};

export const addSocialLinksContainer: SxProps<Theme> = {
  border: `2px solid ${theme.palette.backgroundDark[300]}`,
  padding: '26px 25px',
  marginBottom: '55px',
  borderRadius: '6px',
};
