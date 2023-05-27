import { SxProps, Theme } from '@mui/material/styles';

export const chartContainer: SxProps<Theme> = {
  position: 'relative',
  height: {
    mobile: '255px',
    desktopSemiMedium: '314px',
  },
  width: '100%',
  maxWidth: '404px',
  minWidth: '328px',
  border: '1px solid rgba(64, 64, 64)',
  borderRadius: '8px',
  padding: '10px',
  backgroundColor: 'rgb(33,33,33)',
  display: 'grid',
  gridTemplateColumns: '30px 1fr',
  gridTemplateRows: '30px 1fr',
};

export const yTitle: SxProps<Theme> = {
  fontSize: '16',
  transform: 'rotate(-90deg)',
  color: 'rgb(116, 116, 116)',
  fontWeight: '500',
  whiteSpace: 'nowrap',
  position: 'relative',
  left: {
    mobile: '90px',
    desktopSemiMedium: '120px',
  },
  top: '50px',
};

export const legend: SxProps<Theme> = {
  gridColumn: 'span 2',
  fontSize: '16',
  fontWeight: '700',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const chart: SxProps<Theme> = {
  height: {
    mobile: '205px',
    desktopSemiMedium: '264px',
  },
};
