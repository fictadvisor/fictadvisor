import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '8px 16px',
  borderRadius: '8px',
  backgroundColor: 'backgroundDark.200',
  width: 'fit-content',
  minWidth: {
    mobile: '100%',
    mobileSemiMedium: '330px',
  },
  maxWidth: '100%',
};

export const cardHeader: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  svg: {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
};

export const disciplines: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  paddingLeft: '16px',
};
