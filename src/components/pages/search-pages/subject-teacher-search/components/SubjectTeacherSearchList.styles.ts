import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '60px',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '16px',
};

export const headText: SxProps<Theme> = {
  maxWidth: {
    tablet: '280px',
    mobile: '200px',
  },
  typography: {
    tablet: 'h4Bold',
    mobile: 'h6Bold',
  },
};

export const searchList: SxProps<Theme> = {
  mt: { mobile: '58px', tablet: '65px' },
  mb: '16px',
  display: 'grid',
  gridTemplateColumns: {
    mobile: 'repeat(1, 1fr)',
    mobileMedium: 'repeat(2, 1fr)',
    tablet: 'repeat(3, 1fr)',
    desktop: 'repeat(4, 1fr)',
  },
  rowGap: '4rem',
  alignItems: 'stretch',
  columnGap: '16px',
  gridAutoColumns: 'max-content',
};
