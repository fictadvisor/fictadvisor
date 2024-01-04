import { SxProps, Theme } from '@mui/material/styles';

import { EclipseSize, EclipseType } from '@/components/pages/about-page/types';
import theme from '@/styles/theme';

export const container: SxProps<Theme> = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  padding: { desktop: '0 80px 0', mobile: '0 16px 0' },
  overflow: 'hidden',
};

export const vitrazhShadow: SxProps<Theme> = {
  width: '40%',
  height: '775px',
  left: '0%',
  position: 'absolute',
  background: 'rgba(30, 30, 30, 0.99)',
  backdropFilter: 'blur(10px)',
  boxShadow: `50px 0px 50px 0px ${theme.palette.backgroundDark[100]}`,
  zIndex: 1,
};

export const ficeWallCard: SxProps<Theme> = {
  width: '50%',
  border: `1px solid ${theme.palette.grey[500]}`,
  textAlign: 'center',
  marginTop: '4%',
  padding: '60px',
  left: '25%',
  position: 'absolute',
  borderRadius: '16px',
  background: 'rgba(30, 30, 30, 0.35)',
  backdropFilter: 'blur(10px)',
  zIndex: 1,
};

export const ficeWallShadow: SxProps<Theme> = {
  width: '45%',
  height: '450px',
  left: '27.5%',
  position: 'absolute',
  background: 'rgba(30, 30, 30, 1)',
  mt: '-20px',
  boxShadow: `40px 0px 20px 0px ${theme.palette.backgroundDark[100]}, -30px 0 10px -4px ${theme.palette.backgroundDark[100]}`,
  zIndex: 0,
};

export const ficeWallContainer: SxProps<Theme> = {
  display: 'flex',
  height: { mobileMedium: '395px', mobile: '193px' },
  justifyContent: { desktop: 'space-between', mobile: 'center' },
  marginTop: { desktop: '145px', mobile: 0 },
};

export const specialtyContainer: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  flexDirection: {
    desktop: 'row',
    mobile: 'column',
  },
  position: 'relative',
  marginTop: '140px',
  gap: '16px',
  zIndex: 0,
};

export const studActivityContainerMobile: SxProps<Theme> = {
  display: 'flex',
  width: '100%',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  mt: '16px',
  height: 'fit-content',
  gap: { mobileMedium: '16px', mobile: '32px' },
  justifyContent: 'center',
};

export const history: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: { desktop: 'row', mobile: 'column-reverse' },
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: { desktop: '140px', mobile: '230px' },
  gap: '5%',
};

export const historyText: SxProps<Theme> = {
  maxWidth: '400px',
  gap: { desktop: '18px', mobile: '6px' },
  marginTop: { desktop: 0, mobile: '16px' },
  zIndex: 1,
};

export const fictCard: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: { tablet: '524px', mobile: '330px' },
  height: { tablet: '344px', mobile: 'fit-content' },
  marginTop: { tablet: '160px', mobile: '400px' },
  gap: { tablet: '12px', mobile: '4px' },
  padding: { tablet: '40px', mobile: '16px' },
  background: 'rgba(30, 30, 30, 0.35)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: '16px',
  zIndex: 1,
};

export const cathedraCard: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: { desktop: '24px 20px 16px', mobile: '24px 16px 16px' },
  background: 'rgba(30, 30, 30, 0.35)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: '16px',
  overflow: 'hidden',
};

export const specialtyTextCard: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: { desktop: '20px', mobile: '16px' },
  padding: { desktop: '30px', mobile: '16px' },
  borderRadius: '12px',
  background: theme.palette.backgroundDark[100],
};

export const studentTextCard: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
  padding: '20px',
  borderRadius: '12px',
  background: theme.palette.backgroundDark[50],
};

export const eclipse = (
  size: EclipseSize,
  type: EclipseType,
  opacity: number,
): SxProps<Theme> => ({
  position: 'absolute',
  borderRadius: '100%',
  filter: 'blur(60px)',

  ...(size === EclipseSize.SMALL && {
    width: '250px',
    height: '250px',
  }),
  ...(size === EclipseSize.MEDIUM && {
    width: '420px',
    height: '420px',
  }),
  ...(size === EclipseSize.LARGE && {
    width: '600px',
    height: '600px',
  }),

  ...(type === EclipseType.RED && {
    background: `rgba(222, 49, 49, ${opacity})`,
  }),
  ...(type === EclipseType.BLUE && {
    background: `rgba(48, 51, 135, ${opacity})`,
  }),
  ...(type === EclipseType.VIOLET && {
    background: `rgba(128, 48, 135, ${opacity})`,
  }),
});
