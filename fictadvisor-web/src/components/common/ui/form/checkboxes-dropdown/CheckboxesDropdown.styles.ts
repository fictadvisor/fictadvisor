import { SxProps, Theme } from '@mui/material/styles';

import { FieldSize } from '@/components/common/ui/form/common/types';
import theme from '@/styles/theme';

export const wrapper: SxProps<Theme> = {
  width: '100%',
};

export const label: SxProps<Theme> = {
  overflow: 'hidden',
  padding: '2px 8px',
  maxWidth: '78%',
  background: `linear-gradient(180deg, rgba(30, 30, 30, 0) 50%, ${theme.palette.backgroundDark[100]} 49.95%)`,
  color: 'grey.400',
  '&.Mui-focused': {
    color: 'white.main',
  },
};

export const formControl: SxProps<Theme> = {
  fieldset: { border: 'none' },
  '&.MuiFormLabel-root ': {
    color: 'white',
  },
};

export const select: SxProps<Theme> = {
  border: '2px solid',
  borderColor: 'grey.400',
  borderRadius: '8px',
  '&.Mui-focused': {
    borderColor: 'white.main',
  },
  transition: 'all 0.2s ease-in-out',
};

export const input: SxProps<Theme> = {
  borderRadius: '8px',
  border: '2px solid white',

  transition: 'all 0.2s ease-in-out',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: theme.palette.backgroundDark[100],
  resize: 'none',
  color: theme.palette.grey[800],
};

export const tag: SxProps<Theme> = { m: '3px' };

export const paperProps = (width: number): SxProps<Theme> => ({
  width,
  marginTop: '8px',
  backgroundColor: 'transparent',
  p: '2px 0',
  maxHeight: '144px',
  boxShadow: 'none',
  borderRadius: '8px',
  border: '2px solid',
  borderColor: '#FFFFFF',
  li: {
    '&.Mui-selected': {
      '&:hover': {
        backgroundColor: 'backgroundDark.400',
      },
      backgroundColor: 'backgroundDark.400',
    },
    minHeight: '36px !important',
    p: '6px 8px 6px 26px',
  },
});

export const selectedItems = (size: FieldSize, width: number) => ({
  ...(size === FieldSize.SMALL && {
    padding: '8px 12px',
  }),
  ...(size === FieldSize.MEDIUM && {
    padding: '11px 12px',
  }),
  ...(size === FieldSize.LARGE && {
    padding: '14px 16px',
  }),
  color: theme.palette.white.main,
  width,
});
