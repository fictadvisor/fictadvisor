import { SxProps, Theme } from '@mui/material/styles';

export const wrapper = (
  top: number,
  height: string | number,
  zIndex = 0,
): SxProps<Theme> => ({
  width: {
    tablet: '132px',
    mobile: '100%',
  },
  height: {
    tablet: `calc(${height}px + 4px)`,
    mobile: '80px',
  },
  zIndex,
  borderRadius: '6px',
  position: { tablet: 'absolute' },
  transform: { tablet: `translateY(calc(${top}px - 5px))` },
  transition: 'linear .1s all',
});
