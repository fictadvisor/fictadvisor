import { SxProps, Theme } from '@mui/material/styles';

export const teacherCard = (isSubject: boolean): SxProps<Theme> => ({
  ...(isSubject && {
    maxHeight: '132px',
  }),
  ...(!isSubject && {
    height: '104px',
  }),
  padding: '12px',
  backgroundColor: 'backgroundDark.300',
  borderRadius: '6px',
  width: '100%',
  minWidth: 'fit-content',
  border: '1px solid transparent',
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',
  '&:focus': {
    borderColor: 'primary.300',
  },
  '&:active': {
    borderColor: 'primary.logo',
    backgroundColor: 'backgroundDark.400',
  },
  '&:hover': {
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
  },
});

export const teacherCardEffect: SxProps<Theme> = {
  cursor: 'pointer',
  '&:focus': {
    borderColor: 'primary.300',
  },
  '&:active': {
    borderColor: 'primary.logo',
    backgroundColor: 'backgroundDark.400',
  },
  '&:hover': {
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
  },
};

export const disabledCard: SxProps<Theme> = {
  borderColor: 'transparent',
  backgroundColor: 'backgroundDark.500',
  pointerEvents: 'none',
  color: 'grey.500',
};

export const teacherCardShift = (isSubject: boolean): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  top: '-50px',
  ...(!isSubject && {
    gap: '8px',
  }),
});

export const teacherCardTopPart: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  position: 'relative',
};

export const teacherCardAvatar = (isSubject: boolean): SxProps<Theme> => ({
  boxSizing: 'content-box',
  width: '64px',
  height: '64px',
  boxShadow: '0 0 0 2px backgroundDark.300',
  borderRadius: '100%',
  WebkitBorderRadius: '100%',
  ...(isSubject && {
    marginBottom: '12px',
  }),
});

export const teacherCardTopPartRating: SxProps<Theme> = {
  position: 'relative',
  top: '44px',
};

export const teacherCardName = (isSubject: boolean): SxProps<Theme> => ({
  typography: {
    desktopSemiMedium: 'body2Bold',
    mobile: isSubject ? 'body2Bold' : 'body1Bold',
  },
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: {
    mobile: 3,
    desktopSemiMedium: 2,
  },
  ...(isSubject && {
    marginTop: '12px',
  }),
});

export const teacherCardRoles: SxProps<Theme> = {
  marginBottom: '12px',
};
