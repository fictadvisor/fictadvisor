import { SxProps, Theme } from '@mui/material/styles';

export const card: SxProps<Theme> = {
  backgroundColor: {
    desktop: 'backgroundDark.200',
    mobile: 'backgroundDark.100',
  },
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '16px',
  padding: '16px',
  width: '100%',
  minHeight: 'fit-content',
  transition: 'all 0.2s ease-in-out',
};

export const avatar: SxProps<Theme> = {
  width: '68px',
  height: '68px',
  borderRadius: '100%',
};

export const cardInfo: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  height: 'fit-content',
};

export const description: SxProps<Theme> = {
  display: '-webkit-box',
  color: {
    desktop: 'grey.700',
    mobile: 'grey.500',
  },
  fontSize: {
    mobile: '14px',
    desktop: '11px',
  },
  textTransform: 'none',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2',
};

export const chevronIcon: SxProps<Theme> = {
  minHeight: '20px',
  minWidth: '20px',
};
