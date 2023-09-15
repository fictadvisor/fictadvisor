import { SxProps, Theme } from '@mui/material';

import theme from '@/styles/theme';

import { ScheduleLineVariant } from './types';

export const container = (top: number): SxProps<Theme> => ({
  display: 'none',
  ...(top < 1344 && {
    display: 'flex',
  }),
  alignItems: 'center',
  position: 'absolute',
  width: '100%',
  left: { mobile: -8, tablet: 0 },
  top: { mobile: `calc(${top}% - 4px)`, tablet: top - 4 },
});

export const verticalDivider = (
  variant: ScheduleLineVariant,
): SxProps<Theme> => ({
  height: '18px',
  backgroundColor: theme.palette.primary[600],
  position: 'absolute',

  ...(variant === ScheduleLineVariant.LONG && {
    width: '18px',
    borderRadius: '50%',
    overflow: 'hidden',
  }),

  ...(variant === ScheduleLineVariant.SHORT && {
    width: '4px',
    borderRadius: '2px',
  }),
});

export const horizontalDivider = (
  variant: ScheduleLineVariant,
): SxProps<Theme> => ({
  flex: 'none',
  marginRight: '8px',
  borderBottomRightRadius: '2px',
  borderTopRightRadius: '2px',

  ...(variant === ScheduleLineVariant.LONG && {
    border: `2px solid ${theme.palette.primary[600]}`,
    backgroundColor: 'primary.600',
    height: '2px',
    width: '100%',
  }),

  ...(variant === ScheduleLineVariant.SHORT && {
    border: `2px solid ${theme.palette.primary[600]}`,
    height: '4px',
    width: '128px',
  }),
});

export const dashed: SxProps<Theme> = {
  position: 'absolute',
  backgroundRepeat: 'repeat-x',
  backgroundImage: 'url("/icons/schedule-line.svg")',
  width: '100%',
  height: '2px',
};

export const line = (
  variant: ScheduleLineVariant,
  indent: number,
): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  ...(variant === ScheduleLineVariant.LONG && {
    overflow: 'hidden',
    width: '100%',
  }),
  ...(variant === ScheduleLineVariant.SHORT && {
    height: '4px',
    backgroundColor: 'primary.600',
    borderRadius: '2px',
    zIndex: 0,
    transform: `translateX(${indent}px)`,
  }),
});

export const tooltip: SxProps = {
  backgroundColor: 'primary.100',
};

export const arrow: SxProps = {
  color: 'primary.100',
};
