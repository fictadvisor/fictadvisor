import React, { FC, MouseEventHandler, ReactNode } from 'react';
import { Box, Button } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import * as styles from '@/components/common/ui/icon-button-mui/IconButton.styles';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

export type IconButtonColorType =
  | 'primary'
  | 'error'
  | 'success'
  | 'secondary'
  | 'transparent';

interface IconButtonProps {
  size?: 'normal' | 'large';
  shape?: 'circle' | 'square';
  color?: IconButtonColorType;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
  icon?: ReactNode;
  sx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
}
export type VariantIconButtonProps = Omit<IconButtonProps, 'icon'>;

const IconButton: FC<IconButtonProps> = ({
  sx,
  icon,
  iconSx,
  shape = 'square',
  color = 'primary',
  size = 'normal',
  ...rest
}) => {
  return (
    <Button
      sx={mergeSx(styles.button(shape, color, size), sx)}
      disableRipple
      {...rest}
    >
      <Box sx={mergeSx(styles.iconStyles(size), iconSx)}>{icon}</Box>
    </Button>
  );
};

export default IconButton;
