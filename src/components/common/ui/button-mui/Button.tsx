import React, { FC } from 'react';
import { Box, Button as MuiButton } from '@mui/material';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Button.styles';
import { ButtonColor, ButtonProps, ButtonSize, ButtonVariant } from './types';

const Button: FC<ButtonProps> = ({
  text,
  color = ButtonColor.PRIMARY,
  variant = ButtonVariant.FILLED,
  size = ButtonSize.MEDIUM,
  startIcon,
  endIcon,
  sx = {},
  ...rest
}) => {
  return (
    <MuiButton
      sx={mergeSx(styles.button(color, variant, size), sx)}
      disableRipple
      {...rest}
    >
      {startIcon && <Box sx={styles.icon}>{startIcon}</Box>}
      <p> {text} </p>
      {endIcon && <Box sx={styles.icon}>{endIcon}</Box>}
    </MuiButton>
  );
};

export default Button;
