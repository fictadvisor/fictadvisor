import { SxProps, Theme } from '@mui/material/styles';

export const container: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  transition: 'all linear 0.1s',
  flexWrap: 'nowrap',
  gap: '8px',
  '&:hover': {
    '& *': {
      color: 'grey.700',
      borderColor: 'grey.700',
    },
  },
};

export const name: SxProps<Theme> = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '286px',
  color: 'grey.600',
  whiteSpace: 'nowrap',
};

export const groupName: SxProps<Theme> = {
  marginLeft: '10px',
  borderRadius: '4px',
  padding: '0 2px 0 2px',
  color: 'grey.500',
  border: 0.2,
  borderColor: 'grey.500',
  textTransform: 'none !important',
};

export const position: SxProps<Theme> = {
  textTransform: 'none !important',
};

export const cardInfo: SxProps<Theme> = {
  color: 'grey.500',
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'flex-end',
};

export const avatar: SxProps<Theme> = {
  marginTop: '3px',
  width: '36px',
  height: '36px',
};
