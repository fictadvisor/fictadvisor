import { SxProps, Theme } from '@mui/material/styles';

import colorInfo from '@/components/common/ui/tag-mui/utils/constants';

export const tag = (variant, color, size, icon, text): SxProps<Theme> => ({
  width: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '6px',
  ...(variant != 'outline' && {
    backgroundColor: colorInfo(color, variant),
  }),
  ...(variant == 'outline' && {
    border: `solid 1px`,
    borderColor: colorInfo(color, variant),
  }),
  ...(size == 'medium' && {
    padding: '4px  8px',
    p: {
      fontSize: '16px',
    },
  }),
  ...(size == 'small' && {
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
