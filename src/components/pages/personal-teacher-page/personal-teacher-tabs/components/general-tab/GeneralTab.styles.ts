import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  marginTop: '-15px',
  backgroundColor: {
    mobile: 'inherit',
    desktopSemiMedium: 'backgroundDark.200',
  },
  borderRadius: '4px',
  paddingTop: {
    mobile: '20px',
    desktopSemiMedium: '20px',
  },
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: {
    mobile: '16px',
    desktopSemiMedium: '46px',
  },
};

export const marksNumber: SxProps<Theme> = {
  color: 'backgroundDark.600',
  textAlign: {
    mobile: 'start',
    tablet: 'end',
  },
  width: '1000px',
  maxWidth: '100%',
  zIndex: '1',
};

export const radarWrapper: SxProps<Theme> = {
  width: '100%',
  paddingTop: {
    mobile: '0',
    desktopSemiMedium: '15px',
  },
  paddingBottom: {
    mobile: '0',
    desktopSemiMedium: '10px',
  },

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const listButton = (isOpened: boolean): SxProps<Theme> => ({
  backgroundColor: 'backgroundDark.200',
  '&:hover, &:active, &:focus': {
    backgroundColor: 'backgroundDark.200',
  },
  marginBottom: '6px',
  borderRadius: '4px',
  svg: {
    transition: 'transform .2s linear',
    transform: isOpened ? 'none' : 'rotate(180deg)',
    width: '16px',
    height: '16px',
    color: 'white',
  },
});

export const collapse: SxProps<Theme> = {
  backgroundColor: 'backgroundDark.200',
  borderRadius: '4px',
  padding: '2px 10px',
};

export const list: SxProps<Theme> = {
  width: '100%',
};

export const circleWrapper: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: {
    mobile: '0',
    desktopSemiMedium: '66px',
  },
  paddingBottom: {
    mobile: '0',
    desktopSemiMedium: '46px',
  },
  gap: '30px',
};

export const circleGraphNameWrapper: SxProps<Theme> = {
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
};

export const circleGraph: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  inlineSize: 'min-content',
  overflowWrap: 'break-word',
  gap: '10px',
};

export const columnWrapper: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '14px',
};
