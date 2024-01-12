import { SxProps, Theme } from '@mui/material/styles';

import { IconButtonSize } from '@/components/common/ui/icon-button-mui/types';

export const iconStyles = (size: IconButtonSize): SxProps<Theme> => ({
  ...(size === IconButtonSize.LARGE && {
    width: '38px',
    height: '38px',
  }),
  ...(size === IconButtonSize.NORMAL && {
    width: '24px',
    height: '24px',
  }),
});
