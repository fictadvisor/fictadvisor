import { SxProps, Theme } from '@mui/material/styles';

export const eventsContainer: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  backgroundColor: 'backgroundDark.100',
  p: '16px',
  borderRadius: '6px',
  boxShadow: '0px 4px 10px 10px rgba(0, 0, 0, 0.10)',
  width: { mobile: '100%', tablet: 'fit-content' },
  position: 'relative',
  zIndex: 2,
};

export const eventsContainerGrid: SxProps<Theme> = {
  gap: '12px',
  display: 'grid',
  gridTemplateColumns: { mobile: '1fr', tablet: '1fr 1fr' },
};
