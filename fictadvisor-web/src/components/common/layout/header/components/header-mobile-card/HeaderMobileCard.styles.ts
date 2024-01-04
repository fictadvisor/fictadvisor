import { SxProps, Theme } from '@mui/material';

export const headerCardContainer: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'nowrap',
  transition: 'all linear 0.1s',
  width: 'fit-content',
  minHeight: 'fit-content',
  marginLeft: '24px',
};

export const headerCardInfo: SxProps<Theme> = {
  color: 'grey.500',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: '4px',
  '&:hover': {
    '& *': {
      color: 'grey.700',
      borderColor: 'grey.700',
    },
  },
};

export const headerCardGroupName: SxProps<Theme> = {
  padding: '0 2px',
  marginRight: '8px',
  borderRadius: '4px',
  border: 0.2,
  borderColor: 'grey.500',
};

export const userInfo: SxProps<Theme> = {
  marginTop: '8px',
  gap: '8px',
};

export const avatar: SxProps<Theme> = {
  marginRight: '8px',
  marginTop: '4px',
  width: '48px',
  height: '48px',
};

export const position: SxProps<Theme> = {
  textTransform: 'none !important',
};
