import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

import theme from '@/styles/theme';

import { TabTextPosition } from './types';

export const tab = (
  counter: number | null,
  textPosition: TabTextPosition,
  icon?: ReactNode,
): SxProps<Theme> => ({
  width: '100%',
  minWidth: 'fit-content',
  alignItems: 'center',
  border: {
    mobile: '1px solid transparent',
    desktopSemiMedium: '2px solid transparent',
  },
  borderRadius: '4px',
  gap: '8px',
  cursor: 'pointer',
  textAlign: 'center',
  color: 'grey.800',
  minHeight: '0',
  textTransform: 'none',
  justifyContent: textPosition === TabTextPosition.CENTER ? 'center' : 'start',

  typography: {
    mobile: 'body2Medium',
    desktopSemiMedium: 'body2Bold',
  },
  padding: {
    mobile: '6px 16px',
    desktopSemiMedium: '12px 16px',
  },
  maxHeight: {
    mobile: '36px',
    desktopSemiMedium: '48px',
  },
  maxWidth: {
    mobile: '136px',
    desktopSemiMedium: '200px',
  },
  '&:hover': {
    border: {
      mobile: `1px solid ${theme.palette.backgroundDark[300]}`,
      desktopSemiMedium: `2px solid ${theme.palette.backgroundDark[300]}`,
    },
    color: 'inherit',
  },
  '&.Mui-selected': {
    backgroundColor: 'backgroundDark.300',
    border: {
      mobile: `1px solid ${theme.palette.backgroundDark[400]}`,
      desktopSemiMedium: `2px solid ${theme.palette.backgroundDark[400]}`,
    },
    color: 'inherit',
  },
  '&:active': {
    backgroundColor: 'backgroundDark.200',
    border: {
      mobile: `1px solid ${theme.palette.backgroundDark[200]}`,
      desktopSemiMedium: `2px solid ${theme.palette.backgroundDark[200]}`,
    },
    color: 'inherit',
  },
  '&.Mui-disabled': {
    color: 'grey.200',
    backgroundColor: 'transparent',
    cursor: 'none',
    '.MuiTab-iconWrapper': {
      opacity: '15%',
    },
  },
  '.MuiTab-iconWrapper': {
    display: icon ? 'flex' : 'none',
    alignItems: 'center',
    width: '24px',
    height: '24px',
    margin: '0',
  },
});
export const counter = (disabled: boolean): SxProps<Theme> => ({
  borderRadius: '24px',
  marginLeft: '8px',
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'none',

  backgroundColor: disabled ? `transparent` : `backgroundDark.200`,

  height: {
    mobile: '20px',
    desktopSemiMedium: '26px',
  },
  minWidth: {
    mobile: '20px',
    desktopSemiMedium: '23px',
  },
  padding: {
    mobile: '0 7px',
    desktopSemiMedium: '1px 8px',
  },
  typography: {
    mobile: 'body1Medium',
    desktopSemiMedium: 'body2Medium',
  },
});

export const label: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
};
