import { SxProps, Theme } from '@mui/material/styles';

export const teacherSearchList: SxProps<Theme> = {
  marginTop: '40px',
  marginBottom: '16px',
  display: 'grid',
  gridTemplateColumns: {
    mobile: 'repeat(2, 1fr)',
    desktop: 'repeat(3, 1fr)',
    desktopSemiMedium: 'repeat(4, 1fr)',
  },
  columnGap: {
    mobile: '16px',
    desktop: '32px',
    desktopSemiMedium: '3rem',
  },
  rowGap: '4rem',
  gridAutoRows: 'max-content',
  alignItems: 'center',
};
