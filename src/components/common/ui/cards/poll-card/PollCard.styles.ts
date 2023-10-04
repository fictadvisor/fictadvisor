import { SxProps, Theme } from '@mui/material/styles';

export const card = (
  isActive: boolean,
  disabled?: boolean,
): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'backgroundDark.100',
  padding: '8px 16px',
  width: '100%',
  minWidth: 'fit-content',
  transition: 'all 0.2s ease-in-out',
  borderTop: '1px solid #343434',
  cursor: 'pointer',
  color: 'grey.600',
  height: {
    tablet: '94px',
    mobile: '78px',
  },
  '&:active': {
    borderTop: '1px solid transparent',
    borderRadius: '8px',
    backgroundColor: 'primary.200',
  },
  '&:hover': {
    borderTop: '1px solid transparent',
    borderRadius: '8px',
    backgroundColor: 'primary.50',
    '& svg': {
      opacity: '0',
    },
  },
  ...(isActive && {
    borderTop: '1px solid transparent',
    backgroundColor: 'primary.200',
    borderRadius: '8px',
    '& svg': {
      opacity: '0',
    },
  }),
  ...(disabled && {
    pointerEvents: 'none',
    color: 'grey.300',
    backgroundColor: 'backgroundDark.100',
    '& svg': {
      opacity: '0',
    },
  }),
});

export const textWrapper: SxProps<Theme> = {
  maxWidth: {
    desktopSemiMedium: '356px',
    mobile: '300px',
  },
};

export const questionNumber = (disabled?: boolean): SxProps<Theme> => ({
  color: 'grey.500',
  ...(disabled && {
    color: 'grey.300',
  }),
});
