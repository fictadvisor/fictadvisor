import { SxProps, Theme } from '@mui/system';

import theme from '@/styles/theme';

export const homeIcon: SxProps<Theme> = {
  width: '14px',
  height: '14px',
  transform: 'translateY(-1px)',
};

export const breadcrumb: SxProps<Theme> = {
  li: {
    '&:last-child': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      flex: 1,
    },
  },
  a: {
    gap: '4px',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.grey[700],
  },
};

export const label: SxProps<Theme> = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export const arrow: SxProps<Theme> = {
  width: '12px',
  height: '12px',
  display: 'flex',
};
