import { SxProps, Theme } from '@mui/material/styles';

import { EclipseSize, EclipseType } from '@/app/about/types';

export const eclipse = (
  size: EclipseSize,
  type: EclipseType,
  opacity: number,
): SxProps<Theme> => ({
  position: 'absolute',
  borderRadius: '100%',
  filter: 'blur(60px)',

  ...(size === EclipseSize.SMALL && {
    width: '250px',
    height: '250px',
  }),
  ...(size === EclipseSize.MEDIUM && {
    width: '420px',
    height: '420px',
  }),
  ...(size === EclipseSize.LARGE && {
    width: '600px',
    height: '600px',
  }),

  ...(type === EclipseType.RED && {
    background: `rgba(222, 49, 49, ${opacity})`,
  }),
  ...(type === EclipseType.BLUE && {
    background: `rgba(48, 51, 135, ${opacity})`,
  }),
  ...(type === EclipseType.VIOLET && {
    background: `rgba(128, 48, 135, ${opacity})`,
  }),
});
