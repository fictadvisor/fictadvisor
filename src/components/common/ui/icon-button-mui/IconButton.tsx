import React, { FC } from 'react';
import { Box, Button } from '@mui/material';

import * as styles from '@/components/common/ui/icon-button-mui/IconButton.styles';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import {
  IconButtonColor,
  IconButtonProps,
  IconButtonShape,
  IconButtonSize,
} from './types';

const IconButton: FC<IconButtonProps> = ({
  sx = {},
  icon,
  iconSx = {},
  shape = IconButtonShape.SQUARE,
  color = IconButtonColor.PRIMARY,
  size = IconButtonSize.NORMAL,
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
