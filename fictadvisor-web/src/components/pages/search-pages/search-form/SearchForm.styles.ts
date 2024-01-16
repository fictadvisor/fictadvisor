import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

export const dropdown2 = (isSubject: boolean): SxProps<Theme> => ({
  paddingLeft: {
    desktop: '0',
    desktopSemiMedium: isSubject ? '0' : '12px',
  },
  borderLeft: {
    desktop: '0px solid transparent',
    desktopSemiMedium: isSubject
      ? '0px solid transparent'
      : `1px solid ${theme.palette.grey[400]}`,
  },
});

export const collapseBtn: SxProps<Theme> = {
  display: { tablet: 'none' },
  alignSelf: { tablet: 'center' },
};

export const sortIcon: SxProps<Theme> = {
  height: '48px',
  aspectRatio: '1/1',
  alignSelf: 'center',
  display: 'grid',
};

export const collapseIcon: SxProps<Theme> = {
  height: '48px',
  aspectRatio: '1/1',
  alignSelf: { mobile: 'flex-start', tablet: 'center' },
  display: { mobile: 'grid', tablet: 'block !important' },
  '& .svg': { width: { tablet: '70%' } },
};
