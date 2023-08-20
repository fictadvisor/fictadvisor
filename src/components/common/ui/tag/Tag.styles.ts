import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

import getColor from './utils/get-color';
import { TagColor, TagSize, TagVariant } from './types';

export const tag = (
  variant: TagVariant,
  color: TagColor,
  size: TagSize,
  icon?: ReactNode,
  text?: string,
): SxProps<Theme> => ({
  width: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '6px',
  ...(variant !== TagVariant.OUTLINE && {
    backgroundColor: getColor(color, variant),
  }),
  ...(variant === TagVariant.OUTLINE && {
    border: `solid 1px`,
    borderColor: getColor(color, variant),
  }),
  ...(size === TagSize.MEDIUM && {
    padding: '4px  8px',
    p: {
      fontSize: '16px',
    },
  }),
  ...(size === TagSize.SMALL && {
    padding: '2px 6px',
    p: {
      fontSize: '14px',
    },
  }),
  ...(icon && {
    gap: text ? '4px' : '0px',
  }),
});

export const icon: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignContent: 'center',
};
